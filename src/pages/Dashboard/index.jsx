import React, { Component } from "react";
import { connect } from "react-redux";
import * as utils from "../../utils/post";
import DashboardCrashPage from "../Error/DashboardCrashPage";
import { api_v1, api_v2 } from "../../services/api";
import { addDataIntoCache, getCacheData } from "../../utils/data-cache";
import { Suspense } from "react";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Badge,
  Alert,
} from "reactstrap";

import { Link } from "react-router-dom";
// import NewArticleTable from "./NewArticleTable";

import { getShortLink, copyToClipboard } from "../../utils/shortLink";
//import Charts

import TopicSlide from "./TopicSlide";
import Recommendation from "./Recommendation";

import loader from "../../assets/images/vnalert.svg";
import img3 from "../../assets/images/empty.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import LoginRequirementModal from "../../components/CommonForBoth/LoginRequirementModal";
import ButtonsCarousel from "../../components/CommonForBoth/SocialSharing/ButtonsCarousel";
import axios from "axios";
import RecommendationSkeleton from "./RecommendationSkeleton";
import {
  SubTopicComponent,
  SubTopicComponent4,
  SubTopicComponentMobile,
} from "./TopicComponents/SubTopicComponent";
// import SubTopicSkeleton from "./TopicComponents/SubTopicSkeleton";
import NewArticleTableMobile from "./NewArticleTableMobile";
import TopicSlideMobile from "./TopicSlideMobile";
import SpinnerLoader from "../../assets/images/spinnerLoader.svg";
// import TopicsModal from "./TopicsModal";

const TopicsModal = React.lazy(() => import("./TopicsModal"));
const NewArticleTable = React.lazy(() => import("./NewArticleTable"));

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      topicsModal: false,
      recommendation: { loading: false, result: [] },
      topics: [],
      topicSlide: [],
      subTopics: [],
      subTopic1: {
        loading: false,
        result: [],
      },
      subTopic2: {
        loading: false,
        result: [],
      },
      subTopic3: {
        loading: false,
        result: [],
      },
      trendingKeyword: [],
      isCopy: false,
      isShareModal: false,
      isLoginRequirement: false,
      newArticlePage: 1,
      timeFilter: false,
      isTopicTrendingKeywordOpen: false,
      topicTrendingKeyword: {
        id: "-1",
        thumbnail: "https://api.vnalert.vn/images/xu_huong_avatar.png",
        display: "Xu hướng",
        topic_str: null,
        vnalert_topic: null,
        type: "classify",
      },
      trendingKeywordDuration: 180,
      dailySourceStatisticsDuration: 6,
      isTopicMostReadOpen: false,
      topicMostRead: "Tất cả",
      doughnutData: {
        total: 0,
        pos: 33,
        neg: 33,
        neu: 33,
      },
      newspaperList: [],
      loading: false,
      dailySourceStatistics: {
        total_series: [],
        positive_series: [],
        negative_series: [],
      },
      npiTableData: [],
      newArticleList: [],
      filter: [
        { title: "3 giờ", linkto: "#", isActive: true, duration: 180 },
        { title: "12 giờ", linkto: "#", isActive: false, duration: 720 },
        { title: "48 giờ", linkto: "#", isActive: false, duration: 2880 },
        { title: "7 ngày", linkto: "#", isActive: false, duration: 10080 },
      ],

      chart_filter: [
        { title: "24 giờ", linkto: "#", isActive: false, duration: 1440 },
        { title: "3 ngày", linkto: "#", isActive: false, duration: 4320 },
        { title: "7 ngày", linkto: "#", isActive: true, duration: 10080 },
        { title: "15 ngày", linkto: "#", isActive: false, duration: 21600 },
        { title: "30 ngày", linkto: "#", isActive: false, duration: 43200 },
      ],

      chartInterval: 7,

      modal: false,

      screenSize: window.innerWidth,
      checkVertical: null,
      activeTopic: 0,
      shareLoader: false,
    };
    this.togglemodal.bind(this);
  }

  toggleTopicsModal = () => {
    this.setState({ topicsModal: !this.state.topicsModal });
  };

  togglemodal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  newArticlePaginationHandle = (page) => {
    document.getElementById("new-article-table").scrollIntoView();
    this.setState(
      {
        newArticlePage: page,
      },
      () => this.props.newArticleRequest(page)
    );
  };

  chartClickHandler = (time, sentimentality_filter, interval) => {
    // console.log(time)

    this.props.history.push({
      pathname: "/articles",
      state: {
        start_date: time,
        sentimentality_filter: sentimentality_filter,
        interval: interval,
      },
    });
  };

  getSpecificSourceStatistics(pk, name) {
    const proxyUrl = "https://cors.aivgroup.vn"; //cors-everywhere
    const url = `${api_v1}/sources/${pk}/statistics?duration=7200000`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.props.login.key}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const row_data = [
          {
            pk: pk,
            source_name: name,
            data: responseJson,
          },
        ];
        const table_data = this.state.npiTableData.concat(row_data);
        this.setState({
          npiTableData: [...table_data],
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  getTableSourceStatistics() {
    const proxyUrl = "https://cors.aivgroup.vn"; //cors-everywhere
    const url = `${api_v1}/sources`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.props.login.key}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const newspaperList = responseJson.slice(0, 60);
        // console.log(newspaperList);
        newspaperList.map((newspaper) => {
          this.getSpecificSourceStatistics(newspaper.pk, newspaper.source_name);
        });
        this.setState({
          newspaperList: [...newspaperList],
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  getTrendingMenu = () => {


    var config = {
      method: "get",
      url: api_v1 + "/trending_menu",
      headers: {},
      timeout: 5000,
    };

    return axios(config)
      .then((response) => {
        addDataIntoCache("vnalert-dashboard", config.url, response.data);
        this.setState({
          topics: response.data.topic,
          subTopics: response.data.sub_topic,
        });
        return response.data.topic;
      })
      .catch((error) => {
        return getCacheData("vnalert-dashboard", config.url).then(
          (cacheData) => {
            const topic = cacheData ? cacheData.topic : [];
            const sub_topic = cacheData ? cacheData.sub_topic : [];
            this.setState({
              topics: topic,
              subTopics: sub_topic,
            });
            return topic;
          }
        );
      });
  };

  getTrending = (topic, sub_topic) => {
    if (sub_topic === "1") {
      this.setState({
        subTopic1: { ...this.state.subTopic1, loading: true },
      });
    }
    if (sub_topic === "2") {
      this.setState({
        subTopic2: { ...this.state.subTopic2, loading: true },
      });
    }
    if (sub_topic === "3") {
      this.setState({
        subTopic3: { ...this.state.subTopic3, loading: true },
      });
    }
    const url = `${api_v2}/trends/?format=json&number=20&topic=${topic}&min_article=2&sub_topic=${sub_topic}`;
    const config = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      // data : data,
      timeout: 5000,
    };

    return fetch(url,config)
    .then(response => response.json())
      .then((data) => {
        addDataIntoCache("vnalert-dashboard", url, data);
        return data;
      })
      .catch(function (error) {
        return getCacheData("vnalert-dashboard", url).then((cacheData) =>
          cacheData ? cacheData : []
        );
        // return cacheData
      });
  };

  getRecommendation = (refresh) => {
    this.setState({
      recommendation: { ...this.state.recommendation, loading: true },
    });
    const bodyData = JSON.stringify({
      refresh: refresh,
    });

    const url = `${api_v2}/featured_app_news`;

    const config = this.props.login.userKey
      ? {
        method: "post",
        headers: {
          Authorization: `Token ${this.props.login.userKey.key}`,
          "Content-Type": "application/json"
        },
        // timeout: 10000,
        body: bodyData

      }
      : {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        // timeout: 10000,
        body: bodyData,

      };

    // axios(config)
    //   .then((response) => {
    //     addDataIntoCache("vnalert-dashboard", config.url, response.data);
    //     this.setState({
    //       recommendation: { loading: false, result: response.data },
    //     });
    //   })
    //   .catch((error) => {
    //     getCacheData("vnalert-dashboard", config.url).then((cacheData) => {
    //       this.setState({
    //         recommendation: {
    //           loading: false,
    //           result: cacheData ? cacheData : [],
    //         },
    //       });
    //     });
    //   });

    fetch(url, config)
      .then(response => response.json())
      .then(data => {
        addDataIntoCache("vnalert-dashboard", url, data);
        this.setState({
          recommendation: { loading: false, result: data },
        });
      })
      .catch((error) => {
        getCacheData("vnalert-dashboard", url).then((cacheData) => {
          this.setState({
            recommendation: {
              loading: false,
              result: cacheData ? cacheData : [],
            },
          });
        });
      });
  };

  getDailySourceStatistics(col) {
    const proxyUrl = "https://cors.aivgroup.vn"; //cors-everywhere
    const url = `${api_v1}/sources/daily_statistics?duration=${col}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.props.login.key}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dailySourceStatistics: {
            total_series: [...responseJson.total_series],
            positive_series: [...responseJson.positive_series],
            negative_series: [...responseJson.negative_series],
          },
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  filterClick(duration) {
    const result = this.props.trendingKeywordRequest([
      this.state.topicTrendingKeyword.id,
      this.state.trendingKeywordDuration,
    ]);

    console.log("click");
    console.log(result);
  }

  getShareLink = (url, title, feature_url) => {
    getShortLink(url, title, feature_url).then((link) => {
      this.setState({
        link: link,
        shareLoader: false,
      });
    });
  };

  copyToClipboard = (link) => {
    copyToClipboard(link);
    this.setState({
      isCopy: true,
    });
    setTimeout(
      () =>
        this.setState({
          isCopy: false,
        }),
      1500
    );
  };

  getShareKeywordLink = (keyword, displayKeyword) => {
    const url = `https://web.vnalert.vn/trending-keyword?keyword=${displayKeyword}&display_keyword=${displayKeyword}`;
    const title = `Chủ đề "${displayKeyword}" trên VnAlert`;
    const feature_url =
      "https://vnalert.vn/wp-content/uploads/2021/04/Screen-Shot-2021-04-28-at-17.15.53.png";
    this.getShareLink(url, title, feature_url);
    if (this.props.login.userKey !== null) {
      this.getShareLink(url, title, feature_url);
      this.setState({
        isShareModal: true,
        displayKeyword: displayKeyword,
        shareLoader: true,
      });
    } else {
      this.setState({
        isLoginRequirement: true,
      });
    }
  };

  closeLoginRequirementModal = () => {
    this.setState({
      isLoginRequirement: false,
    });
  };

  closeShareModal = () => {
    this.setState({
      isShareModal: false,
    });
  };

  changeTopic = (topic) => {
    this.setState({
      topicTrendingKeyword: topic,
    });
    if (this.state.screenSize <= 767) {
      if (this.state.activeTopic + 1 === 4) {
        this.props.articleMostReadRequest(this.state.topicTrendingKeyword.id);
        this.setState({ checkVertical: this.props.articleMostRead });
      } else {
        this.getTrending(topic.id, `${this.state.activeTopic + 1}`).then(
          (result) => {
            this.setState({
              checkVertical: { loading: false, result: result },
            });
          }
        );
      }
    }
  };

  submitTopicsModal = (topics) => {
    const sorted_topics = topics.sort((a, b) => Number(a.id) - Number(b.id));
    localStorage.setItem(
      "web-vnalert-trending-topics",
      JSON.stringify(sorted_topics)
    );
    this.setState({
      topicsModal: false,
      topicSlide: sorted_topics,
    });
  };

  //acive topic
  setActiveTopic = (topicNumber) => {
    var verticalTopic = document.querySelector(".vertical-topic");
    if (verticalTopic) {
      let emptyActive = document.querySelector(".active-topic");
      if (emptyActive) {
        emptyActive.classList.remove("active-topic");
      }
      let child = verticalTopic.children[topicNumber];
      child.classList.add("active-topic");
    }
  };
  // update state screenSize
  updateWindowDimensions = () => {
    this.setState({ screenSize: window.innerWidth });
  };

  componentWillMount() {
    window.removeEventListener("resize", this.updateWindowDimensions());
    this.setActiveTopic(this.state.activeTopic);
  }

  componentDidMount() {
    this.getRecommendation(false);
    this.getTrendingMenu().then((result) => {
      if (this.props.login.userKey) {
        const saveTopics = localStorage.getItem("web-vnalert-trending-topics")
          ? JSON.parse(localStorage.getItem("web-vnalert-trending-topics"))
            .filter((topic) => result.find((t) => t.id === topic.id))
            .sort((a, b) => Number(a.id) - Number(b.id))
          : result.slice(0, 6);

        localStorage.setItem(
          "web-vnalert-trending-topics",
          JSON.stringify(saveTopics)
        );
        this.setState({
          topicSlide: saveTopics,
          topicTrendingKeyword: saveTopics[0],
        });
        this.props.articleMostReadRequest(saveTopics[0].id);
        this.getTrending(saveTopics[0].id, "1").then((result) =>
          this.setState({ subTopic1: { loading: false, result: result } })
        );
        this.getTrending(saveTopics[0].id, "2").then((result) =>
          this.setState({ subTopic2: { loading: false, result: result } })
        );
        this.getTrending(saveTopics[0].id, "3").then((result) =>
          this.setState({ subTopic3: { loading: false, result: result } })
        );
      } else {
        this.setState({
          topicSlide: result.slice(0, 6),
          topicTrendingKeyword: result[0],
        });
        this.props.articleMostReadRequest(result[0].id);
        this.getTrending(result[0].id, "1").then((result) =>
          this.setState({ subTopic1: { loading: false, result: result } })
        );
        this.getTrending(result[0].id, "2").then((result) =>
          this.setState({ subTopic2: { loading: false, result: result } })
        );
        this.getTrending(result[0].id, "3").then((result) =>
          this.setState({ subTopic3: { loading: false, result: result } })
        );
      }
    });
    // this.getTableSourceStatistics();

    // this.getDailySourceStatistics(6);

    // this.props.trendingKeywordRequest(["0", 180]);
    this.props.newArticleRequest(1);

    //change screen size
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // console.log("Before the update " + prevState.topicTrendingKeyword.id)
    // console.log( "now " + this.state.topicTrendingKeyword.id)
    if (
      prevState.topicTrendingKeyword.id !==
      this.state.topicTrendingKeyword.id &&
      prevState.topicTrendingKeyword.id !== "-1"
    ) {
      this.props.articleMostReadRequest(this.state.topicTrendingKeyword.id);
      this.getTrending(this.state.topicTrendingKeyword.id, "1").then((result) =>
        this.setState({ subTopic1: { loading: false, result: result } })
      );
      this.getTrending(this.state.topicTrendingKeyword.id, "2").then((result) =>
        this.setState({ subTopic2: { loading: false, result: result } })
      );
      this.getTrending(this.state.topicTrendingKeyword.id, "3").then((result) =>
        this.setState({ subTopic3: { loading: false, result: result } })
      );
    }

    if (!this.props.login.userKey && prevProps.login.userKey) {
      this.getTrendingMenu().then((result) => {
        this.setState({
          topicSlide: result.slice(0, 6),
        });
      });
    }
  }

  componentDidUpdate() {
    // this.getTrending(this.state.topicTrendingKeyword.id,"1").then(result => console.log("result 1"))
    // this.getTrending(this.state.topicTrendingKeyword.id,"2").then(result => console.log("result 2"))
    // this.getTrending(this.state.topicTrendingKeyword.id,"3").then(result => console.log("result 3"))
  }

  // set lại state cho các subTopic sau khi tách card topic thành component mới
  reSetCardTopic = (subTopic, idTopic) => {
    if (idTopic === "1") {
      this.setState({ subTopic1: subTopic.subTopic });
    } else if (idTopic === "2") {
      this.setState({ subTopic2: subTopic.subTopic });
    } else if (idTopic === "3") {
      this.setState({ subTopic3: subTopic.subTopic });
    } else {
      console.log("tin doc nhieu");
    }
  };

  reSetCardTopicMobile = (resetData) => {
    if (resetData.activeTopic === 0 && resetData.subTopic1) {
      this.setState({
        subTopic1: resetData.subTopic1,
      });
    } else if (resetData.activeTopic === 1 && resetData.subTopic2) {
      this.setState({
        subTopic2: resetData.subTopic2,
      });
    } else if (resetData.activeTopic === 2 && resetData.subTopic3) {
      this.setState({
        subTopic3: resetData.subTopic3,
      });
    }

    // if (this.state.checkVertical.loading) console.log("true");
    this.setState({
      checkVertical: resetData.checkVertical,
      activeTopic: resetData.activeTopic,
    });
  };

  getShareSummaryLink = (pk) => {
    this.setState({ shareLoader: true, });
    if (this.props.login.userKey !== null) {


      var config = {
        method: "get",
        url: `${api_v1}/summary/${pk}/share`,
        headers: {
          Authorization: `Token ${this.props.login.userKey.key}`,
        },
      };

      axios(config)
        .then((response) => {
          const link = response.data.link.replace(
            "go.vnalert.vn/",
            "go.vnalert.vn/out/"
          );
          this.setState({
            isShareModal: true,
            link: link,
            shareLoader: false,
          });
        })
        .catch(function (error) {
          console.log(error);
          this.setState({ shareLoader: false, });
        });
    } else {
      this.setState({
        isLoginRequirement: true,
        shareLoader: false,
      });
    }
  }

  render() {
    // console.log(this.props.trendingKeyword.posts)

    return (
      <React.Fragment>
        {this.state.shareLoader && <div className="d-flex justify-content-center align-items-center position-fixed spinner-loader">
          <div style={{ opacity: 1 }}>
            <img src={SpinnerLoader} />
          </div>
        </div>}
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            {!this.state.shareLoader && <ButtonsCarousel
              copy={this.copyToClipboard}
              isModal={this.state.isShareModal}
              url={this.state.link}
              shareText={`Chủ đề "${this.state.displayKeyword}" trên VnAlert`}
              hide={this.closeShareModal}
            />}
            <LoginRequirementModal
              isOpen={this.state.isLoginRequirement}
              closeModal={this.closeLoginRequirementModal}
            />
            {this.state.isCopy && (
              <Alert
                color="success"
                className="d-flex align-items-center"
                style={{
                  width: 240,
                  position: "fixed",
                  left: "calc(50%-120px)",
                  bottom: "20px",
                  zIndex: 99999,
                }}
              >
                <i
                  className="bx bx-check-circle mr-2 font-size-16"
                  style={{ color: "#5FC490" }}
                ></i>
                Liên kết đã được sao chép
              </Alert>
            )}
            <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center pb-0">
                  <h4 className="mb-0 mr-2">Dành cho bạn </h4>
                  <div
                    className="cursor-pointer d-flex align-items-center"
                    onClick={() => this.getRecommendation(true)}
                  >
                    {this.state.recommendation.loading ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-rotate-clockwise-2 rotate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#495057"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                        <line x1="5.63" y1="7.16" x2="5.63" y2="7.17" />
                        <line x1="4.06" y1="11" x2="4.06" y2="11.01" />
                        <line x1="4.63" y1="15.1" x2="4.63" y2="15.11" />
                        <line x1="7.16" y1="18.37" x2="7.16" y2="18.38" />
                        <line x1="11" y1="19.94" x2="11" y2="19.95" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-rotate-clockwise"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#495057"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                      </svg>
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            {this.state.recommendation.loading ? (
              <RecommendationSkeleton />
            ) : (
              <Recommendation posts={this.state.recommendation.result} />
            )}

            <Suspense fallback={<div>Loading...</div>}>
              <TopicsModal
                toggle={this.toggleTopicsModal}
                modal={this.state.topicsModal}
                topics={this.state.topics}
                topicSlide={this.state.topicSlide}
                submit={this.submitTopicsModal}
              />
            </Suspense>

            <Row className={this.state.screenSize >= 456 ? "my-5" : "mb-4"}>
              <Col xs="12">
                {this.state.screenSize >= 456 ? (
                  <>
                    <div className="page-title-box d-flex align-items-center pb-0">
                      <h4 className="mb-0 mr-2">Chủ đề đang quan tâm </h4>
                      <svg
                        onClick={() => {
                          if (this.props.login.userKey) {
                            this.toggleTopicsModal();
                          } else {
                            this.setState({
                              isLoginRequirement: true,
                            });
                          }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-circle-plus cursor-pointer"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#3452E1"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="mb-2">
                      <TopicSlide
                        onTopicClick={this.changeTopic}
                        topics={this.state.topicSlide}
                      />
                    </div>
                  </>
                ) : (
                  <div className="d-flex my-auto py-1 bg-white">
                    <div style={{ width: "90%" }} className="bg-light mx-2 my-2 py-2">
                      <TopicSlideMobile
                        onTopicClick={this.changeTopic}
                        topics={this.state.topicSlide}
                        topicTrendingKeyword={this.state.topicTrendingKeyword}
                      />
                    </div>
                    <svg
                      onClick={() => {
                        if (this.props.login.userKey) {
                          this.toggleTopicsModal();
                        } else {
                          this.setState({
                            isLoginRequirement: true,
                          });
                        }
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-circle-plus cursor-pointer my-auto mr-1"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="#3452E1"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="9" />
                      <line x1="9" y1="12" x2="15" y2="12" />
                      <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                  </div>
                )}
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center ">
                  <h4 className="mb-0">
                    {" "}
                    Chủ đề {this.state.topicTrendingKeyword.display}
                  </h4>
                </div>
              </Col>
            </Row>

            {this.state.screenSize >= 767 ? (
              <Row>
                <SubTopicComponent
                  props={{
                    subTopics: [this.state.subTopics[0]],
                    subTopic: this.state.subTopic1,
                    getTrending: this.getTrending,
                    getShareKeywordLink: this.getShareKeywordLink,
                    reSetCardTopic: this.reSetCardTopic,
                    topicTrendingKeyword: this.state.topicTrendingKeyword,
                  }}
                />

                <SubTopicComponent
                  props={{
                    subTopics: [this.state.subTopics[1]],
                    subTopic: this.state.subTopic2,
                    getTrending: this.getTrending,
                    getShareKeywordLink: this.getShareKeywordLink,
                    reSetCardTopic: this.reSetCardTopic,
                    topicTrendingKeyword: this.state.topicTrendingKeyword,
                  }}
                />

                <SubTopicComponent
                  props={{
                    subTopics: [this.state.subTopics[2]],
                    subTopic: this.state.subTopic3,
                    getTrending: this.getTrending,
                    getShareKeywordLink: this.getShareKeywordLink,
                    reSetCardTopic: this.reSetCardTopic,
                    topicTrendingKeyword: this.state.topicTrendingKeyword,
                  }}
                />

                <SubTopicComponent4
                  props={{
                    articleMostReadRequest: this.props.articleMostReadRequest,
                    articleMostRead: this.props.articleMostRead,
                    topicTrendingKeyword: this.state.topicTrendingKeyword,
                    getShareKeywordLink: this.getShareKeywordLink,
                  }}
                />
              </Row>
            ) : (
              <SubTopicComponentMobile
                props={{
                  getTrending: this.getTrending,
                  checkVertical:
                    this.state.checkVertical === null
                      ? this.state.subTopic1
                      : this.state.checkVertical,
                  activeTopic: this.state.activeTopic,
                  subTopics: this.state.subTopics,
                  topicTrendingKeyword: this.state.topicTrendingKeyword,
                  getShareKeywordLink: this.getShareKeywordLink,
                  reSetCardTopicMobile: this.reSetCardTopicMobile,
                  setActiveTopic: this.setActiveTopic,
                  articleMostReadRequest: this.props.articleMostReadRequest,
                  articleMostRead: this.props.articleMostRead,
                }}
              />
            )}

            <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center mt-5">
                  <h4 className="mb-0"> Vừa đăng tải</h4>
                </div>
              </Col>
            </Row>

            <Suspense fallback={<div>Loading...</div>}>
              {this.state.screenSize >= 767 ? (
                <NewArticleTable
                  tableTitle={""}
                  isLoading={this.props.newArticle.loading}
                  list={this.props.newArticle.posts}
                  page={this.state.newArticlePage}
                  paginationClick={this.newArticlePaginationHandle}
                  getShareSummaryLink={this.getShareSummaryLink}
                />
              ) : (
                <NewArticleTableMobile
                  tableTitle={""}
                  isLoading={this.props.newArticle.loading}
                  list={this.props.newArticle.posts}
                  page={this.state.newArticlePage}
                  paginationClick={this.newArticlePaginationHandle}
                  getShareSummaryLink={this.getShareSummaryLink}
                />
              )}
            </Suspense>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.Login,
    articleMostRead: state.ArticleMostRead,
    trendingKeyword: state.TrendingKeyword,
    newArticle: state.NewArticle,
    dailySourceStatistics: state.DailySourceStatistics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    articleMostReadRequest: (topic) => {
      dispatch({
        type: "ARTICLE_MOST_READ_REQUEST",
        payload: topic,
      });
    },

    trendingKeywordRequest: (filter) => {
      dispatch({
        type: "TRENDING_KEYWORD_REQUEST",
        payload: filter,
      });
    },

    newArticleRequest: (page) => {
      dispatch({
        type: "NEW_ARTICLE_REQUEST",
        payload: page,
      });
    },

    dailySourceStatisticsRequest: (duration) => {
      dispatch({
        type: "DAILY_SOURCE_STATISTICS_REQUEST",
        payload: duration,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
