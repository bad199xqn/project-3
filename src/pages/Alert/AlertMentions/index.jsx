import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Badge,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  ButtonDropdown,
  Media,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import classnames from "classnames";
import * as utils from "../../../utils/post";
import { getShortLink, copyToClipboard } from "../../../utils/shortLink";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";

import LineChart from "./LineChart";
import "../alert.scss";

//Import Breadcrumb

import News from "../../../assets/images/News.svg";
import MXH from "../../../assets/images/MXH.svg";
import Blog from "../../../assets/images/Blog.svg";
import Youtube from "../../../assets/images/Youtube.svg";
import BookmarkPopup from "../../../components/CommonForBoth/BookmarkPopup";
import loader from "../../../assets/images/vnalert.svg";
import SpinnerLoader from "../../../assets/images/spinnerLoader.svg";
import ButtonsCarousel from "../../../components/CommonForBoth/SocialSharing/ButtonsCarousel";
import CrashPage from "../../Error/CrashPage";
import { api_v1 } from "../../../services/api";
import AlertExport from "../AlertExport";
import { labelPost } from "../../../utils/labelApi";
import AlertExportModal from "../AlertExportModal";

class AlertMentions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isModal: false,
      link: "",
      isCopy: false,
      page: 1,
      keywordDetailsParams: {
        keyword: null,
        duration: "days",
        page: 1,
        range_filter: 0,
        start_date: "",
        interval: 14,
        sentimentality_filter: "0",
        source_filter: "0",
      },
      alertMentionsParams: {
        key: null,
        alertPk: null,
        page: 1,
        publicToken: null,
        duration: "days",
        start_date: "",
        interval: 14,
        sentimentality_filter: "0",
        source_filter: "0",
      },
      alertMentionsStatisticsParams: {
        key: null,
        duration: "days",
        interval: 14,
        publicToken: null,
      },
      search_Menu: false,
      searchKeyword: "",
      timeFilter: false,
      filter: [
        { title: "6 giờ", isActive: false },
        { title: "12 giờ", isActive: false },
        { title: "24 giờ", isActive: false },
        { title: "7 ngày", isActive: false },
        { title: "14 ngày", isActive: true },
        { title: "30 ngày", isActive: false },
      ],
      duration: "days",
      interval: 14,
      activeTab: false,
      rangeFilter: {
        topic: true,
        description: false,
        content: false,
      },
      sourceFilter: {
        news: true,
        blog: true,
        mxh: true,
        youtube: true,
      },
      sentimentalityFilter: {
        pos: true,
        neg: true,
        neu: true,
      },
      currentPost: -1,
      tooltipOpen: false,
      shareLoader: false,
      exportStatus: null,
      sentimentalityStatus: null,
      newSearchingResults: [],
    };

    this.toggleSearch = this.toggleSearch.bind(this);
    this.myRef = React.createRef();
  }

  chartClickHandler = (time) => {
    this.setState(
      {
        alertMentionsParams: {
          ...this.state.alertMentionsParams,
          duration: this.state.alertMentionsStatisticsParams.duration,
          page: 1,
          start_date: time,
          interval:
            time === "" ? this.state.alertMentionsStatisticsParams.interval : 1,
        },
        page: 1,
      },
      () =>
        this.props.alertMentionsRequest({
          ...this.state.alertMentionsParams,
          page: 1,
        })
    );
  };

  getPublicToken = (alertPk) => {
    const config = {
      method: "get",
      url: `${api_v1}/alerts/${alertPk}/?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
      },
    };

    return axios(config)
      .then((response) => {
        return response.data.public_token;
      })
      .catch(function (error) {});
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

  getShareLink = (url, title, feature_url) => {
    getShortLink(url, title, feature_url).then((link) => {
      this.setState({
        link: link,
        shareLoader: false,
      });
    });
  };

  copyAlertLinkToClipboard = () => {
    document.getElementById("copy-to-clipboard").click();
  };

  onCopy = () => {
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

  getShareAlertLink = () => {
    this.setState({ shareLoader: true });
    if (this.state.publicToken === null) {
      this.getPublicToken(this.props.location.state.alertPk).then(
        (publicToken) => {
          const url = `https://web.vnalert.vn/alert-detail?displayKeyword=${this.state.displayKeyword}&p=${publicToken}`;
          const title = `Cảnh báo "${this.state.displayKeyword}" trên VnAlert`;
          const feature_url =
            "https://vnalert.vn/wp-content/uploads/2021/04/Screen-Shot-2021-04-28-at-17.15.53.png";
          this.getShareLink(url, title, feature_url);
          this.setState({
            isModal: true,
          });
        }
      );
    } else {
      const url = `https://web.vnalert.vn/alert-detail?displayKeyword=${this.state.displayKeyword}&p=${this.state.publicToken}`;
      const title = `Cảnh báo "${this.state.displayKeyword}" trên VnAlert`;
      const feature_url =
        "https://vnalert.vn/wp-content/uploads/2021/04/Screen-Shot-2021-04-28-at-17.15.53.png";
      this.getShareLink(url, title, feature_url);
      this.setState({
        isModal: true,
      });
    }
  };

  copyArticleLink = async (url) => {
    await this.setState({
      link: url,
    });
    document.getElementById("copy-to-clipboard").click();
  };

  getShareArticleLink = (pk) => {
    this.setState({ shareLoader: true });
    if (this.props.login.userKey !== null) {
      var config = {
        method: "get",
        url: `${api_v1}/articles/${pk}/share?format=json`,
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
            isModal: true,
            link: link,
            shareLoader: false,
          });
        })
        .catch(function (error) {
          this.setState({ shareLoader: false });
          console.log(error);
        });
    } else {
      this.setState({
        isLoginRequirement: true,
        shareLoader: false,
      });
    }
  };
  getShareSummaryLink = (pk) => {
    this.setState({ shareLoader: true });
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
            isModal: true,
            link: link,
            shareLoader: false,
          });
        })
        .catch(function (error) {
          console.log(error);
          this.setState({ shareLoader: false });
        });
    } else {
      this.setState({
        isLoginRequirement: true,
        shareLoader: false,
      });
    }
  };

  export = (alert_pk, key) => {
    this.setState({
      shareLoader: true,
    });
    var data = JSON.stringify({
      alert_pk: alert_pk,
      type: "word",
      interval: 60,
    });

    var config = {
      method: "post",
      url: api_v1 + "/export_alert/?format=json",
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      timeout: 3000000,
      data: data,
      responseType: "blob",
    };

    axios(config)
      .then((response) => {
        this.setState({
          shareLoader: false,
          exportStatus: true,
        });
        const fileName = this.state.displayKeyword + ".pdf";
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          shareLoader: false,
          exportStatus: false,
        });
      });
  };

  executeScroll = () => this.myRef.current.scrollIntoView();
  //Toggle Chat Box Menus
  toggleSearch() {
    this.setState((prevState) => ({
      search_Menu: !prevState.search_Menu,
    }));
  }

  toggleTab = () => {
    if (this.state.activeTab === true) {
      this.setState({
        activeTab: false,
      });
    }

    if (this.state.activeTab === false) {
      this.setState({
        activeTab: true,
      });
    }
  };

  filterClick(title) {
    if (title === "6 giờ") {
      this.setState(
        {
          filter: [
            { title: "6 giờ", isActive: true },
            { title: "12 giờ", isActive: false },
            { title: "24 giờ", isActive: false },
            { title: "7 ngày", isActive: false },
            { title: "14 ngày", isActive: false },
            { title: "30 ngày", isActive: false },
          ],
          duration: "hours",
          interval: 6,
          page: 1,
          alertMentionsParams: {
            ...this.state.alertMentionsParams,
            page: 1,
            duration: "hours",
            interval: 6,
          },
          alertMentionsStatisticsParams: {
            ...this.state.alertMentionsStatisticsParams,
            duration: "hours",
            interval: 6,
          },
        },
        () => {
          this.props.alertMentionsRequest(this.state.alertMentionsParams);
          this.props.alertMentionsStatisticsRequest(
            this.state.alertMentionsStatisticsParams
          );
        }
      );
    }

    if (title === "12 giờ") {
      this.setState(
        {
          filter: [
            { title: "6 giờ", isActive: false },
            { title: "12 giờ", isActive: true },
            { title: "24 giờ", isActive: false },
            { title: "7 ngày", isActive: false },
            { title: "14 ngày", isActive: false },
            { title: "30 ngày", isActive: false },
          ],
          duration: "hours",
          interval: 12,
          page: 1,
          alertMentionsParams: {
            ...this.state.alertMentionsParams,
            page: 1,
          },
          alertMentionsStatisticsParams: {
            ...this.state.alertMentionsStatisticsParams,
            duration: "hours",
            interval: 12,
          },
        },
        () => {
          this.props.alertMentionsRequest(this.state.alertMentionsParams);
          this.props.alertMentionsStatisticsRequest(
            this.state.alertMentionsStatisticsParams
          );
        }
      );
    }

    if (title === "24 giờ") {
      this.setState(
        {
          filter: [
            { title: "6 giờ", isActive: false },
            { title: "12 giờ", isActive: false },
            { title: "24 giờ", isActive: true },
            { title: "7 ngày", isActive: false },
            { title: "14 ngày", isActive: false },
            { title: "30 ngày", isActive: false },
          ],
          duration: "hours",
          interval: 24,
          page: 1,
          alertMentionsParams: {
            ...this.state.alertMentionsParams,
            page: 1,
          },
          alertMentionsStatisticsParams: {
            ...this.state.alertMentionsStatisticsParams,
            duration: "hours",
            interval: 24,
          },
        },
        () => {
          this.props.alertMentionsRequest(this.state.alertMentionsParams);
          this.props.alertMentionsStatisticsRequest(
            this.state.alertMentionsStatisticsParams
          );
        }
      );
    }

    if (title === "7 ngày") {
      this.setState(
        {
          filter: [
            { title: "6 giờ", isActive: false },
            { title: "12 giờ", isActive: false },
            { title: "24 giờ", isActive: false },
            { title: "7 ngày", isActive: true },
            { title: "14 ngày", isActive: false },
            { title: "30 ngày", isActive: false },
          ],
          duration: "days",
          interval: 7,
          page: 1,
          alertMentionsParams: {
            ...this.state.alertMentionsParams,
            page: 1,
          },
          alertMentionsStatisticsParams: {
            ...this.state.alertMentionsStatisticsParams,
            duration: "days",
            interval: 7,
          },
        },
        () => {
          this.props.alertMentionsRequest(this.state.alertMentionsParams);
          this.props.alertMentionsStatisticsRequest(
            this.state.alertMentionsStatisticsParams
          );
        }
      );
    }

    if (title === "14 ngày") {
      this.setState(
        {
          filter: [
            { title: "6 giờ", isActive: false },
            { title: "12 giờ", isActive: false },
            { title: "24 giờ", isActive: false },
            { title: "7 ngày", isActive: false },
            { title: "14 ngày", isActive: true },
            { title: "30 ngày", isActive: false },
          ],
          duration: "days",
          interval: 14,
          page: 1,
          alertMentionsParams: {
            ...this.state.alertMentionsParams,

            page: 1,
          },
          alertMentionsStatisticsParams: {
            ...this.state.alertMentionsStatisticsParams,

            duration: "days",
            interval: 14,
          },
        },
        () => {
          this.props.alertMentionsRequest(this.state.alertMentionsParams);
          this.props.alertMentionsStatisticsRequest(
            this.state.alertMentionsStatisticsParams
          );
        }
      );
    }

    if (title === "30 ngày") {
      this.setState(
        {
          filter: [
            { title: "6 giờ", isActive: false },
            { title: "12 giờ", isActive: false },
            { title: "24 giờ", isActive: false },
            { title: "7 ngày", isActive: false },
            { title: "14 ngày", isActive: false },
            { title: "30 ngày", isActive: true },
          ],
          duration: "days",
          interval: 30,
          page: 1,
          alertMentionsParams: {
            ...this.state.alertMentionsParams,
            duration: "days",
            interval: 30,

            page: 1,
          },
          alertMentionsStatisticsParams: {
            ...this.state.alertMentionsStatisticsParams,

            duration: "days",
            interval: 30,
          },
        },
        () => {
          this.props.alertMentionsRequest(this.state.alertMentionsParams);
          this.props.alertMentionsStatisticsRequest(
            this.state.alertMentionsStatisticsParams
          );
        }
      );
    }
  }

  pageArr = (resultsCount) => {
    let i = 1;
    let pages = [];
    let maxPage = resultsCount / 20 >= 5 ? 5 : resultsCount / 20 + 1;
    if (resultsCount / 20 <= 5 && resultsCount % 20 === 0) {
      maxPage = resultsCount / 20;
    }
    if (resultsCount / 20 > 5) {
      maxPage = 5;
    }

    while (i <= maxPage) {
      pages = [...pages, i];
      i++;
    }
    return pages;
  };

  filterValue = (interval) => {
    switch (interval) {
      case 6:
        return "6 giờ";
      case 12:
        return "12 giờ";
      case 24:
        return "24 giờ";
      case 7:
        return "7 ngày";
      case 14:
        return "14 ngày";
      case 30:
        return "30 ngày";
      default:
        break;
    }
  };

  rangeFilterValue = (rangeFilter) => {
    const topic = rangeFilter.topic;
    const description = rangeFilter.description;
    const content = rangeFilter.content;
    if (topic && description && content) return 0;
    if (topic && description) return 1;
    if (description && content) return 2;
    if (topic && content) return 3;
    if (topic) return 4;
    if (description) return 5;
    if (content) return 6;
  };

  sourceFilterCheck = (source) => {
    switch (source) {
      case 1:
        return this.state.sourceFilter.news;
        break;

      case 2:
        return this.state.sourceFilter.blog;
        break;

      case 3:
        return this.state.sourceFilter.mxh;
        break;

      case 4:
        return this.state.sourceFilter.youtube;
        break;
      default:
        break;
    }
  };

  // sentimentalityFilterCheck = (sentimentality) => {
  //   switch (sentimentality) {
  //     case "1":
  //       return this.state.sentimentalityFilter.pos;
  //       break;

  //     case "2":
  //       return this.state.sentimentalityFilter.neg;
  //       break;

  //     case "3":
  //       return this.state.sentimentalityFilter.neu;
  //       break;
  //     default:
  //       return this.state.sentimentalityFilter.neu;
  //       break;
  //   }
  // };
  sentimentalityFilterCheck = (sentimentality) => {
    switch (sentimentality) {
      case "1":
        return this.state.sentimentalityFilter.pos;
        break;

      case "2":
        return this.state.sentimentalityFilter.neg;
        break;

      case "3":
        return this.state.sentimentalityFilter.neu;
        break;
      default:
        return this.state.sentimentalityFilter.neu;
        break;
    }
  };

  componentDidMount() {
    try {
      const url = window.location.href.replace(/&amp;/g, "&");
      const params = new URL(url).searchParams;
      const publicToken =
        params.get("p") === null
          ? this.props.location.state.publicToken
          : params.get("p");
      const displayKeyword = params.get("displayKeyword");
      const alertPk = this.props.location.state
        ? this.props.location.state.alertPk
        : 0;
      this.setState(
        {
          publicToken: publicToken,
          displayKeyword: displayKeyword,
          alertMentionsParams: {
            ...this.state.alertMentionsParams,
            key:
              this.props.login.userKey !== null
                ? this.props.login.userKey.key
                : "",
            alertPk: alertPk,
            publicToken: params.get("p") === null ? null : publicToken,
          },
          alertMentionsStatisticsParams: {
            ...this.state.alertMentionsStatisticsParams,
            key:
              this.props.login.userKey !== null
                ? this.props.login.userKey.key
                : "",
            alertPk: alertPk,
            publicToken: params.get("p") === null ? null : publicToken,
          },
        },
        () => {
          this.props.alertMentionsRequest({
            ...this.state.alertMentionsParams,
            publicToken: params.get("p") === null ? null : publicToken,
          });
          this.props.alertMentionsStatisticsRequest({
            ...this.state.alertMentionsStatisticsParams,
            publicToken: params.get("p") === null ? null : publicToken,
          });
        }
      );
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  hidePopup = () => {
    this.setState({ openPopup: false });
  };

  showPopup = () => {
    this.setState({ openPopup: true });
  };

  hideModal = () => {
    this.setState({ isModal: false });
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  componentDidUpdate(nextProps) {
    try {
      if (nextProps.location !== this.props.location) {
        const url = window.location.href.replace(/&amp;/g, "&");
        const params = new URL(url).searchParams;

        const publicToken =
          params.get("p") === null
            ? this.props.location.state.publicToken
            : params.get("p");

        const displayKeyword = params.get("displayKeyword");
        const alertPk = this.props.location.state
          ? this.props.location.state.alertPk
          : 0;

        this.setState(
          {
            displayKeyword: displayKeyword,
            alertMentionsParams: {
              ...this.state.alertMentionsParams,
              alertPk: alertPk,
              publicToken: publicToken,
            },
            alertMentionsStatisticsParams: {
              ...this.state.alertMentionsStatisticsParams,
              alertPk: alertPk,
              publicToken: publicToken,
            },
          },
          () => {
            this.props.alertMentionsRequest({
              ...this.state.alertMentionsParams,
              page: this.state.page,
              publicToken: publicToken,
            });
            // this.props.alertMentionsStatisticsRequest({...this.state.alertMentionsStatisticsParams, publicToken: publicToken});
          }
        );
      }
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  handleSentimentality = async (
    article_pk,
    mention_pk,
    sentimentality,
    session_id,
    screen_type,
    keyword
  ) => {
    this.setState({
      shareLoader: true,
    });
    if (this.props.login.userKey === null) {
      this.setState({
        isLoginRequirement: true,
        shareLoader: false,
      });
      return;
    }

    const resStatus = await labelPost(
      this.props.login.userKey.key,
      article_pk,
      mention_pk,
      sentimentality,
      session_id,
      screen_type,
      keyword
    );
    if (resStatus.status === 200) {
      const oldResult =
        this.state.newSearchingResults.length === 0
          ? this.props.alertMentions.results
          : this.state.newSearchingResults;
      const newResult = oldResult.map((item) => {
        if (item.article.pk === article_pk && item.pk === mention_pk) {
          return {
            ...item,
            sentimentality: [`${sentimentality}`],
            article: { ...item.article, sentimentality: [`${sentimentality}`] },
          };
        }
        return item;
      });

      this.setState({
        shareLoader: false,
        sentimentalityStatus: true,
        newSearchingResults: newResult,
      });
      return;
    } else {
      this.setState({
        shareLoader: false,
        sentimentalityStatus: false,
      });
      return;
    }
  };

  fil = (filter, type) => {
    var newState = this.state.alertMentionsParams;

    if (filter === "sentimentality") {
      if (newState.sentimentality_filter === "0") {
        return (newState = {
          ...newState,
          page: 1,
          sentimentality_filter: ["1", "2", "3"]
            .filter((item) => item !== type.toString())
            .join(","),
        });
      } else {
        const findIndex = newState.sentimentality_filter
          .split(",")
          .indexOf(type.toString());
        if (findIndex === -1) {
          if (newState.sentimentality_filter.split(",").length === 0) {
            return (newState = {
              ...newState,
              page: 1,
              sentimentality_filter: "0",
            });
          }
          return (newState = {
            ...newState,
            page: 1,
            sentimentality_filter: newState.sentimentality_filter + `,${type}`,
          });
        } else {
          return (newState = {
            ...newState,
            page: 1,
            sentimentality_filter: newState.sentimentality_filter
              .split(",")
              .filter((item) => item !== type.toString())
              .join(","),
          });
        }
      }
    }

    if (filter === "source") {
      if (newState.source_filter === "0") {
        return (newState = {
          ...newState,
          page: 1,
          source_filter: ["1", "2", "3", "4"]
            .filter((item) => item !== type.toString())
            .join(","),
        });
      } else {
        const findIndex = newState.source_filter
          .split(",")
          .indexOf(type.toString());
        if (findIndex === -1) {
          if (newState.source_filter.split(",").length === 0) {
            return (newState = { ...newState, page: 1, source_filter: "0" });
          }
          return (newState = {
            ...newState,
            page: 1,
            source_filter: newState.source_filter + `,${type}`,
          });
        } else {
          return (newState = {
            ...newState,
            page: 1,
            source_filter: newState.source_filter
              .split(",")
              .filter((item) => item !== type.toString())
              .join(","),
          });
        }
      }
    }
    return { ...newState, page: 1 };
  };

  handleFilter = _.debounce((filter, type) => {
    if (filter === "source") {
      let checkArr = [];
      for (const key in this.state.sourceFilter) {
        checkArr = [...checkArr, this.state.sourceFilter[key]];
      }
      const findTrueStatus = checkArr.filter((item) => item === true);
      const findTrueIndex = checkArr.indexOf(true) + 1;
      if (findTrueStatus.length <= 1) {
        if (findTrueIndex === type) {
          return;
        }
      }

      let newState = this.state.sourceFilter;
      if (type === 1) {
        newState = {
          ...this.state.sourceFilter,
          news: !this.state.sourceFilter.news,
        };
      } else if (type === 2) {
        newState = {
          ...this.state.sourceFilter,
          blog: !this.state.sourceFilter.blog,
        };
      } else if (type === 3) {
        newState = {
          ...this.state.sourceFilter,
          mxh: !this.state.sourceFilter.mxh,
        };
      } else if (type === 4) {
        newState = {
          ...this.state.sourceFilter,
          youtube: !this.state.sourceFilter.youtube,
        };
      }

      this.setState({
        sourceFilter: newState,
      });
    }

    if (filter === "sentimentality") {
      let checkArr = [];
      for (const key in this.state.sentimentalityFilter) {
        checkArr = [...checkArr, this.state.sentimentalityFilter[key]];
      }
      const findTrueStatus = checkArr.filter((item) => item === true);
      const findTrueIndex = checkArr.indexOf(true) + 1;
      if (findTrueStatus.length <= 1) {
        if (findTrueIndex === type) {
          return;
        }
      }

      let newState = this.state.sentimentalityFilter;
      if (type === 1) {
        newState = {
          ...this.state.sentimentalityFilter,
          pos: !this.state.sentimentalityFilter.pos,
        };
      } else if (type === 2) {
        newState = {
          ...this.state.sentimentalityFilter,
          neg: !this.state.sentimentalityFilter.neg,
        };
      } else if (type === 3) {
        newState = {
          ...this.state.sentimentalityFilter,
          neu: !this.state.sentimentalityFilter.neu,
        };
      }

      this.setState({
        sentimentalityFilter: newState,
      });
    }

    const newStateKeyword = this.fil(filter, type);
    this.setState(
      {
        alertMentionsParams: newStateKeyword,
        page: 1,
      },
      () => this.props.alertMentionsRequest(newStateKeyword)
    );
  }, 420);

  render() {
    if (
      this.state.exportStatus !== null ||
      this.state.sentimentalityStatus !== null
    ) {
      setTimeout(() => {
        this.setState({
          exportStatus: null,
          sentimentalityStatus: null,
        });
      }, 3000);
    }
    const arrSentimentality = [1, 2, 3];
    const results = (results) =>
      results.map((post, index) => {
        const source_type = post.source_type ? post.source_type[0] : 1;
        const sentimentality = post.sentimentality
          ? post.sentimentality[0]
          : "3";

        return this.sourceFilterCheck(source_type) &&
          this.sentimentalityFilterCheck(sentimentality) ? (
          <tr key={index}>
            <td className="pt-0 pl-0 pr-0">
              <div className="d-flex justify-content-between align-content-center">
                <div
                  style={{
                    paddingTop: 0,
                    whiteSpace: "normal",
                    wordWrap: "break-all",
                  }}
                >
                  <h6
                    style={{
                      maxWidth: "100%",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.3,
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",

                      margin: 0,
                    }}
                    className="mb-2"
                  >
                    <a
                      href={post.article.href}
                      target="_blank"
                      style={{ color: "#495057" }}
                    >
                      {post.article.title}
                    </a>
                    {post.article.summary !== null &&
                      post.article.summary !== "" && (
                        <span className="ml-2">
                          <Link
                            to={`/summary-article?pk=${post.article.pk}`}
                            target="_blank"
                          >
                            Xem tóm tắt{" "}
                            <i className="bx bx-link-external font-size-12"></i>
                          </Link>
                        </span>
                      )}
                  </h6>
                </div>
                <div className="mr-2">
                  <UncontrolledDropdown>
                    <DropdownToggle href="#" className="card-drop" tag="i">
                      <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      {/* <DropdownItem
                        className="d-flex align-items-center"
                        onClick={() =>
                          this.getShareArticleLink(post.article.pk)
                        }
                      >
                        <i className="bx bx-share-alt font-size-16 mr-2"></i>
                        Chia sẻ bài viết
                      </DropdownItem> */}
                      {/* {post.article.summary !== null &&
                        post.article.summary !== "" && (
                          <DropdownItem
                            className="d-flex align-items-center"
                            onClick={() =>
                              this.getShareSummaryLink(post.article.pk)
                            }
                          >
                            <i className="bx bx-share-alt font-size-16 mr-2"></i>
                            Chia sẻ tin tóm tắt
                          </DropdownItem>
                        )} */}
                      <DropdownItem
                        className="d-flex align-items-center"
                        onClick={() =>
                          this.copyArticleLink(
                            post.article.href,
                            post.article.title,
                            post.article.feature_url
                          )
                        }
                      >
                        <i className="bx bx-link font-size-16 mr-2"></i>
                        Sao chép liên kết
                      </DropdownItem>
                      <DropdownItem
                        className="d-flex align-items-center"
                        onClick={() =>
                          this.setState({
                            openPopup: true,
                            mentionPk: post.pk,
                          })
                        }
                      >
                        <i className="bx bx-bookmark font-size-16 mr-2"></i>
                        Lưu trữ bài viết
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>

              <div
                style={{
                  paddingTop: 0,
                  whiteSpace: "normal",
                  wordWrap: "break-all",
                }}
              >
                <p
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",

                    color: "#495057",
                    margin: 0,
                  }}
                  className="mb-0"
                >
                  {post.article.description}
                </p>
              </div>

              <div
                style={{
                  paddingTop: 0,
                  whiteSpace: "normal",
                  wordWrap: "break-all",
                }}
              >
                <p
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",

                    color: "#495057",
                    margin: 0,
                  }}
                  className="text-muted mt-2"
                >
                  <img
                    src={utils.iconSource(post.article.source_type[0])}
                    alt=""
                    height="14"
                    className="mr-1"
                  />
                  <small>
                    {" "}
                    {utils.relativeTime(post.article.publish_date)} -{" "}
                    {post.article.source}
                  </small>
                </p>
              </div>
              <div className="d-flex flex-row mt-2">
                {arrSentimentality.map((sentimen, i) => {
                  if (sentimen == sentimentality) {
                    return (
                      <Badge
                        key={i + 1000}
                        className={`font-size-12 p-1 mr-2 badge-soft-${utils.sentimentalityColor(
                          sentimen
                        )}`}
                        color={utils.sentimentalityColor(sentimen)}
                        style={{ borderRadius: "4px" }}
                        pill
                        // onClick={() => this.handleSentimentality(post.pk, sentimen)}
                      >
                        {utils.sentimentalityText(sentimen)}
                      </Badge>
                    );
                  }
                  return (
                    <Badge
                      key={i + 1000}
                      className={`cursor-pointer font-size-12 p-1 mr-2 badge-soft-secondary`}
                      color={utils.sentimentalityColor(sentimen)}
                      style={{ borderRadius: "4px" }}
                      pill
                      onClick={() =>
                        this.handleSentimentality(
                          post.article.pk,
                          post.pk,
                          sentimen,
                          null,
                          3,
                          this.state.displayKeyword
                        )
                      }
                    >
                      {utils.sentimentalityText(sentimen)}
                    </Badge>
                  );
                })}
              </div>
              <div
                className="mt-3"
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#f8f8f8",
                }}
              />
            </td>
          </tr>
        ) : (
          <tr key={index}>
            <td className="pt-0 pl-0 pr-0">
              <div className="d-flex justify-content-between align-content-center">
                <div
                  style={{
                    paddingTop: 0,
                    whiteSpace: "normal",
                    wordWrap: "break-all",
                  }}
                >
                  <h6
                    style={{
                      maxWidth: "100%",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.3,
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",

                      margin: 0,
                    }}
                    className="mb-2"
                  >
                    <a
                      href={post.article.href}
                      target="_blank"
                      style={{ color: "#495057" }}
                    >
                      {post.article.title}
                    </a>
                    {post.article.summary !== null &&
                      post.article.summary !== "" && (
                        <span className="ml-2">
                          <Link
                            to={`/summary-article?pk=${post.article.pk}`}
                            target="_blank"
                          >
                            Xem tóm tắt{" "}
                            <i className="bx bx-link-external font-size-12"></i>
                          </Link>
                        </span>
                      )}
                  </h6>
                </div>
                <div className="mr-2">
                  <UncontrolledDropdown>
                    <DropdownToggle href="#" className="card-drop" tag="i">
                      <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      {/* <DropdownItem
                        className="d-flex align-items-center"
                        onClick={() =>
                          this.getShareArticleLink(post.article.pk)
                        }
                      >
                        <i className="bx bx-share-alt font-size-16 mr-2"></i>
                        Chia sẻ bài viết
                      </DropdownItem> */}
                      {/* {post.article.summary !== null &&
                        post.article.summary !== "" && (
                          <DropdownItem
                            className="d-flex align-items-center"
                            onClick={() =>
                              this.getShareSummaryLink(post.article.pk)
                            }
                          >
                            <i className="bx bx-share-alt font-size-16 mr-2"></i>
                            Chia sẻ tin tóm tắt
                          </DropdownItem>
                        )} */}
                      <DropdownItem
                        className="d-flex align-items-center"
                        onClick={() =>
                          this.copyArticleLink(
                            post.article.href,
                            post.article.title,
                            post.article.feature_url
                          )
                        }
                      >
                        <i className="bx bx-link font-size-16 mr-2"></i>
                        Sao chép liên kết
                      </DropdownItem>
                      <DropdownItem
                        className="d-flex align-items-center"
                        onClick={() =>
                          this.setState({
                            openPopup: true,
                            mentionPk: post.pk,
                          })
                        }
                      >
                        <i className="bx bx-bookmark font-size-16 mr-2"></i>
                        Lưu trữ bài viết
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>

              <div
                style={{
                  paddingTop: 0,
                  whiteSpace: "normal",
                  wordWrap: "break-all",
                }}
              >
                <p
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",

                    color: "#495057",
                    margin: 0,
                  }}
                  className="mb-0"
                >
                  {post.article.description}
                </p>
              </div>

              <div
                style={{
                  paddingTop: 0,
                  whiteSpace: "normal",
                  wordWrap: "break-all",
                }}
              >
                <p
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",

                    color: "#495057",
                    margin: 0,
                  }}
                  className="text-muted mt-2"
                >
                  <img
                    src={utils.iconSource(post.article.source_type[0])}
                    alt=""
                    height="14"
                    className="mr-1"
                  />
                  <small>
                    {" "}
                    {utils.relativeTime(post.article.publish_date)} -{" "}
                    {post.article.source}
                  </small>
                </p>
              </div>
              <div className="d-flex flex-row mt-2">
                {arrSentimentality.map((sentimen, i) => {
                  if (sentimen == sentimentality) {
                    return (
                      <Badge
                        key={i + 1000}
                        className={`font-size-12 p-1 mr-2 badge-soft-${utils.sentimentalityColor(
                          sentimen
                        )}`}
                        color={utils.sentimentalityColor(sentimen)}
                        style={{ borderRadius: "4px" }}
                        pill
                        // onClick={() => this.handleSentimentality(post.pk, sentimen)}
                      >
                        {utils.sentimentalityText(sentimen)}
                      </Badge>
                    );
                  }
                  return (
                    <Badge
                      key={i + 1000}
                      className={`cursor-pointer font-size-12 p-1 mr-2 badge-soft-secondary`}
                      color={utils.sentimentalityColor(sentimen)}
                      style={{ borderRadius: "4px" }}
                      pill
                      onClick={() =>
                        this.handleSentimentality(
                          post.article.pk,
                          post.pk,
                          sentimen,
                          null,
                          3,
                          this.state.displayKeyword
                        )
                      }
                    >
                      {utils.sentimentalityText(sentimen)}
                    </Badge>
                  );
                })}
              </div>
              <div
                className="mt-3"
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#f8f8f8",
                }}
              />
            </td>
          </tr>
        );
      });
    const textStyle = {
      maxWidth: "100%",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",

      color: "#495057",
      margin: 0,
    };

    if (this.state.error) {
      return <CrashPage />;
    }
    return (
      <React.Fragment>
        <AlertExportModal />
        {this.state.shareLoader && (
          <div className="d-flex justify-content-center align-items-center position-fixed spinner-loader">
            <div style={{ opacity: 1 }}>
              <img src={SpinnerLoader} alt="" />
            </div>
          </div>
        )}
        <div className="page-content">
          <Container fluid>
            <CopyToClipboard
              id="copy-to-clipboard"
              onCopy={this.onCopy}
              text={this.state.link}
            >
              <span></span>
            </CopyToClipboard>
            <BookmarkPopup
              isOpen={this.state.openPopup}
              hide={this.hidePopup}
              show={this.showPopup}
              type="mention"
              mentionPk={this.state.mentionPk}
            />
            {!this.state.shareLoader && (
              <ButtonsCarousel
                copy={this.copyAlertLinkToClipboard}
                isModal={this.state.isModal}
                url={this.state.link}
                shareText={`Cảnh báo "${this.state.displayKeyword}" ${
                  this.props.userDetails !== null
                    ? "của " +
                      this.props.userDetails.last_name +
                      " " +
                      this.props.userDetails.first_name +
                      " "
                    : ""
                }trên VnAlert`}
                hide={this.hideModal}
              />
            )}

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

            {this.state.exportStatus !== null && (
              <Alert
                color={this.state.exportStatus ? "success" : "danger"}
                className="d-flex align-items-center"
                style={{
                  width: 240,
                  position: "fixed",
                  left: "calc(50%-120px)",
                  bottom: "20px",
                  zIndex: 99999,
                }}
              >
                {this.state.exportStatus ? (
                  <>
                    <i
                      className="bx bx-check-circle mr-2 font-size-16"
                      style={{ color: "#5FC490" }}
                    ></i>
                    Tải báo cáo thành công
                  </>
                ) : (
                  <>
                    <i className="far fa-times-circle mr-2 font-size-16"></i>Tải
                    báo cáo thất bại
                  </>
                )}
              </Alert>
            )}

            {this.state.sentimentalityStatus !== null && (
              <Alert
                color={`${
                  this.state.sentimentalityStatus ? "success" : "danger"
                }`}
                className="d-flex align-items-center"
                style={{
                  width: 240,
                  position: "fixed",
                  left: "calc(50%-120px)",
                  bottom: "20px",
                  zIndex: 99999,
                }}
              >
                {this.state.sentimentalityStatus ? (
                  <span>
                    <i className="bx bx-check-circle mr-2 font-size-16"></i> Cập
                    nhật thành công
                  </span>
                ) : (
                  <span>
                    <i className="bx bx-error-circle mr-2 font-size-16"></i> Cập
                    nhật thất bại
                  </span>
                )}
              </Alert>
            )}
            {/* Render Breadcrumb */}
            {/* <Breadcrumbs title="" breadcrumbItem="" /> */}
            <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4>Chi tiết chủ đề</h4>
                </div>
              </Col>
            </Row>

            {!this.props.alertMentions && (
              <Row>
                <Col lg="12" xs="12">
                  <div style={{ height: 350 }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(50% - 45px)",
                        left: "calc(50% - 45px)",
                      }}
                    >
                      <span className="logo-sm loader">
                        <img src={loader} alt="" height="90" />
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            )}

            {this.props.alertMentions ? (
              <Row>
                <Col lg="9">
                  <Row>
                    <Col lg="12">
                      <Card>
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <CardTitle
                              className="d-flex align-items-center"
                              style={{ margin: 0 }}
                            >
                              <h6 className="card-title" style={textStyle}>
                                {this.state.displayKeyword}
                              </h6>
                            </CardTitle>

                            <div
                              style={{
                                // backgroundColor: "#FAFAFB",
                                // padding: "8px",
                                borderRadius: "10px",
                                // marginBottom: "12px",
                                alignSelf: "center",
                              }}
                            >
                              <ButtonDropdown
                                isOpen={this.state.timeFilter}
                                toggle={() =>
                                  this.setState({
                                    timeFilter: !this.state.timeFilter,
                                  })
                                }
                              >
                                <DropdownToggle
                                  caret
                                  id="dropdown-toggle"
                                  // color="info"
                                  className="btn-sm w-xs"
                                  style={{
                                    color: "#495057",
                                    backgroundColor: "#F8F8F8",
                                    borderColor: "#fff",
                                  }}
                                >
                                  {
                                    // this.state.filter.find(
                                    //   (filter) => filter.isActive
                                    // ).title
                                    this.filterValue(
                                      this.state.alertMentionsStatisticsParams
                                        .interval
                                    )
                                  }{" "}
                                  <i className="mdi mdi-chevron-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {this.state.filter.map((filter, key) => (
                                    <DropdownItem
                                      onClick={() =>
                                        this.filterClick(filter.title)
                                      }
                                      key={key + 9999}
                                    >
                                      {filter.title}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </ButtonDropdown>
                            </div>
                          </div>
                          <Nav pills justified>
                            <NavItem style={{ backgroundColor: "#F8F8F8" }}>
                              <NavLink
                                // className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => {
                                  this.toggleTab();
                                }}
                              >
                                {/* <i className="bx bx-group font-size-20 d-sm-none"></i> */}
                                <span className="d-sm-block">
                                  {this.state.activeTab
                                    ? "Ẩn biểu đồ"
                                    : "Hiện biểu đồ"}
                                </span>
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <div className="clearfix"></div>
                          {this.state.activeTab &&
                            this.props.statisticsLoading && (
                              <div
                                style={{
                                  position: "relative",
                                  height: 350,
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "40%",
                                    left: "calc(50% - 30px)",
                                  }}
                                >
                                  <span className="logo-sm loader">
                                    <img src={loader} alt="" height="60" />
                                  </span>
                                </div>
                              </div>
                            )}
                          {this.state.activeTab &&
                            !this.props.statisticsLoading && (
                              <LineChart
                                onChartClick={this.chartClickHandler}
                              />
                            )}
                        </CardBody>
                      </Card>
                      <div ref={this.myRef} />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <Card>
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6
                              className="d-flex align-items-center"
                              style={{ margin: 0 }}
                            >
                              Bài viết mới nhất
                            </h6>

                            <div className="d-flex align-items-center">
                              <AlertExport
                                pk={this.state.alertMentionsParams.alertPk}
                                name={this.state.displayKeyword}
                                type="pdf"
                              >
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light align-items-center d-flex mr-2"
                                  style={{ backgroundColor: "#F8F8F8" }}
                                  // onClick={() =>this.export(this.state.alertMentionsParams.alertPk, this.props.login.userKey.key)}
                                >
                                  Tải báo cáo (PDF)
                                  <i className="fas fa-file-download font-size-12 align-middle ml-2"></i>
                                </button>
                              </AlertExport>

                              <AlertExport
                                pk={this.state.alertMentionsParams.alertPk}
                                name={this.state.displayKeyword}
                                type="xlsx"
                              >
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light align-items-center d-flex mr-2"
                                  style={{ backgroundColor: "#F8F8F8" }}
                                  // onClick={() =>this.export(this.state.alertMentionsParams.alertPk, this.props.login.userKey.key)}
                                >
                                  Tải danh sách tin (EXCEL)
                                  <i className="fas fa-file-download font-size-12 align-middle ml-2"></i>
                                </button>
                              </AlertExport>

                              <button
                                type="button"
                                className="btn waves-effect waves-light align-items-center d-flex"
                                style={{ backgroundColor: "#F8F8F8" }}
                                onClick={this.getShareAlertLink}
                              >
                                Chia sẻ
                                <i className="fas fa-share font-size-12 align-middle ml-2"></i>
                              </button>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <div className="">
                            <div className="table-responsive">
                              <Table
                                className="project-list-table table-nowrap table-centered table-borderless"
                                style={{}}
                              >
                                <thead></thead>
                                <tbody>
                                  {this.props.loading && (
                                    <tr>
                                      <div
                                        style={{
                                          position: "relative",
                                          height: 150,
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: "40%",
                                            left: "calc(50% - 30px)",
                                          }}
                                        >
                                          <span className="logo-sm loader">
                                            <img
                                              src={loader}
                                              alt=""
                                              height="60"
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </tr>
                                  )}
                                  {!this.props.loading &&
                                  this.props.alertMentions.results &&
                                  this.state.newSearchingResults.length === 0
                                    ? results(this.props.alertMentions.results)
                                    : results(this.state.newSearchingResults)}
                                  {!this.props.loading &&
                                    this.props.alertMentions.results.length ===
                                      0 &&
                                    this.state.newSearchingResults.length ===
                                      0 && (
                                      <tr>
                                        <td className="text-center">
                                          <span className="text-black-50">
                                            Không tìm thấy bài viết nào.
                                          </span>
                                        </td>
                                      </tr>
                                    )}
                                </tbody>
                              </Table>
                            </div>
                            <nav aria-label="...">
                              <ul className="pagination justify-content-center">
                                {this.pageArr(
                                  this.props.alertMentions.count
                                ).map((page) => {
                                  return this.state.page === page ? (
                                    <li
                                      className="page-item active ml-1 mr-1"
                                      key={page}
                                    >
                                      <Link
                                        style={{
                                          width: "34px",
                                          borderRadius: "50%",
                                        }}
                                        className="page-link justify-content-center d-flex"
                                        // to={`/alert-detail?displayKeyword=${this.state.displayKeyword}&p=${this.state.publicToken}`}
                                        to={{
                                          pathname: "/alert-detail",
                                          search: `?displayKeyword=${this.state.displayKeyword}`,
                                          state: {
                                            alertPk:
                                              this.state.alertMentionsParams
                                                .alertPk,
                                            publicToken: this.state.publicToken,
                                            page: page,
                                          },
                                        }}
                                        onClick={() => {
                                          this.setState(
                                            {
                                              // alertMentionsParams: {
                                              //   ...this.state
                                              //     .alertMentionsParams,
                                              //   page: page,
                                              // },
                                              page: page,
                                            }
                                            // () =>
                                            //   this.props.alertMentionsRequest(
                                            //     this.state.alertMentionsParams
                                            //   )
                                          );
                                        }}
                                      >
                                        {page}{" "}
                                        <span className="sr-only">
                                          (current)
                                        </span>
                                      </Link>
                                    </li>
                                  ) : (
                                    <li
                                      className="page-item ml-1 mr-1"
                                      key={page}
                                    >
                                      <Link
                                        style={{
                                          width: "34px",
                                          borderRadius: "50%",
                                        }}
                                        className="page-link justify-content-center d-flex"
                                        // to={`/alert-detail?displayKeyword=${this.state.displayKeyword}&p=${this.state.publicToken}`}
                                        to={{
                                          pathname: "/alert-detail",
                                          search: `?displayKeyword=${this.state.displayKeyword}`,
                                          state: {
                                            alertPk:
                                              this.state.alertMentionsParams
                                                .alertPk,
                                            publicToken: this.state.publicToken,
                                            page: page,
                                          },
                                        }}
                                        onClick={() => {
                                          this.setState(
                                            {
                                              // alertMentionsParams: {
                                              //   ...this.state
                                              //     .alertMentionsParams,
                                              //   page: page,
                                              // },
                                              page: page,
                                            }
                                            // () =>
                                            //   this.props.alertMentionsRequest(
                                            //     this.state.alertMentionsParams
                                            //   )
                                          );
                                        }}
                                      >
                                        {page}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </nav>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>

                <Col lg="3">
                  <Row>
                    <Col>
                      <div className="mb-4">
                        <h6 className="mb-4">Nguồn tin</h6>
                      </div>

                      <div className=" button-items mb-4">
                        <button
                          type="button"
                          className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            width: 160,
                          }}
                          onClick={() => this.handleFilter("source", 1)}
                        >
                          <span>
                            <img
                              src={News}
                              alt=""
                              height="16"
                              className="mr-2"
                            />
                            Chính thống{" "}
                          </span>
                          <i
                            className="bx bx-check font-size-16 align-middle "
                            style={{
                              color: this.state.sourceFilter.news
                                ? "#3E64FF"
                                : "#fff",
                            }}
                          ></i>
                        </button>
                        <button
                          type="button"
                          className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            width: 160,
                          }}
                          onClick={() => this.handleFilter("source", 2)}
                        >
                          <span>
                            <img
                              src={Blog}
                              alt=""
                              height="16"
                              className="mr-2"
                            />
                            Blog/Web{" "}
                          </span>
                          <i
                            className="bx bx-check font-size-16 align-middle "
                            style={{
                              color: this.state.sourceFilter.blog
                                ? "#3E64FF"
                                : "#fff",
                            }}
                          ></i>
                        </button>
                        <button
                          type="button"
                          className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            width: 160,
                          }}
                          onClick={() => this.handleFilter("source", 3)}
                        >
                          <span>
                            <img
                              src={MXH}
                              alt=""
                              height="16"
                              className="mr-2"
                            />
                            Facebook{" "}
                          </span>
                          <i
                            className="bx bx-check font-size-16 align-middle "
                            style={{
                              color: this.state.sourceFilter.mxh
                                ? "#3E64FF"
                                : "#fff",
                            }}
                          ></i>
                        </button>

                        <button
                          type="button"
                          className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            width: 160,
                          }}
                          onClick={() => this.handleFilter("source", 4)}
                        >
                          <span>
                            <img
                              src={Youtube}
                              alt=""
                              height="16"
                              className="mr-2"
                            />
                            Youtube{" "}
                          </span>
                          <i
                            className="bx bx-check font-size-16 align-middle "
                            style={{
                              color: this.state.sourceFilter.youtube
                                ? "#3E64FF"
                                : "#fff",
                            }}
                          ></i>
                        </button>
                      </div>
                    </Col>

                    <Col>
                      <div className="mb-4">
                        <h6>Tính chất thông tin</h6>
                      </div>

                      <div className=" button-items mb-2">
                        <button
                          type="button"
                          className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            width: 160,
                          }}
                          onClick={() => this.handleFilter("sentimentality", 1)}
                        >
                          Tích cực{"  "}{" "}
                          <i
                            className="bx bx-check font-size-16 align-middle "
                            style={{
                              color: this.state.sentimentalityFilter.pos
                                ? "#3E64FF"
                                : "#fff",
                            }}
                          ></i>
                        </button>
                        <button
                          type="button"
                          className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            width: 160,
                          }}
                          onClick={() => this.handleFilter("sentimentality", 2)}
                        >
                          Tiêu cực{"  "}{" "}
                          <i
                            className="bx bx-check font-size-16 align-middle "
                            style={{
                              color: this.state.sentimentalityFilter.neg
                                ? "#3E64FF"
                                : "#fff",
                            }}
                          ></i>
                        </button>
                        <button
                          type="button"
                          className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            width: 160,
                          }}
                          onClick={() => this.handleFilter("sentimentality", 3)}
                        >
                          Trung tính{"  "}{" "}
                          <i
                            className="bx bx-check font-size-16 align-middle "
                            style={{
                              color: this.state.sentimentalityFilter.neu
                                ? "#3E64FF"
                                : "#fff",
                            }}
                          ></i>
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : null}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alertMentions: state.AlertMentions.alertMentionsData,
    loading: state.AlertMentions.loading,
    statisticsLoading: state.AlertMentionsStatistics.loading,
    login: state.Login,
    userDetails: state.UserDetails.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertMentionsRequest: (alertMentionsParams) => {
      dispatch({
        type: "ALERT_MENTIONS_REQUEST",
        payload: alertMentionsParams,
      });
    },
    alertMentionsStatisticsRequest: (alertMentionsStatisticsParams) => {
      dispatch({
        type: "ALERT_MENTIONS_STATISTICS_REQUEST",
        payload: alertMentionsStatisticsParams,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AlertMentions));
