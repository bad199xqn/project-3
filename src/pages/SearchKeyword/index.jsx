import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import _, { debounce } from "lodash";
import ErrorBoundary from "../Error/ErrorBoundary";
import {
  Badge,
  Table,
  Container,
  Row,
  Col,
  Alert,
  ButtonDropdown,
  Media,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardTitle,
  Collapse,
} from "reactstrap";
import classnames from "classnames";
import * as utils from "../../utils/post";
import { getShortLink, copyToClipboard } from "../../utils/shortLink";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import LineChart from "./LineChart";
import "./SearchKeyword.scss";

//Import Breadcrumb
import title from "../../assets/images/title-icon.svg";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import News from "../../assets/images/News.svg";
import MXH from "../../assets/images/MXH.svg";
import Blog from "../../assets/images/Blog.svg";
import Youtube from "../../assets/images/Youtube.svg";
import BookmarkPopup from "../../components/CommonForBoth/BookmarkPopup";
import loader from "../../assets/images/vnalert.svg";
import ButtonsCarousel from "../../components/CommonForBoth/SocialSharing/ButtonsCarousel";
import LoginRequirementModal from "../../components/CommonForBoth/LoginRequirementModal";
import CrashPage from "../Error/CrashPage";
import { api_v1 } from "../../services/api";
import SpinnerLoader from "../../assets/images/spinnerLoader.svg";
import axios from "axios";
import SearchExport from "./SearchExport";
import { labelPost } from "../../utils/labelApi";

class SearchKeyword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusSearchBox: false,
      error: false,
      historySearch: [],
      isGuidlineOpen: true,
      isLoginRequirement: false,
      isModal: false,
      link: "",
      displayKeyword: "",
      isFirstload: true,
      isCopy: false,
      page: 1,
      searchingParams: {
        keyword: null,
        duration: "days",
        page: 1,
        range_filter: 4,
        start_date: "",
        interval: 30,
        sentimentality_filter: "0",
        source_filter: "0",
      },
      searchingStatisticsParams: {
        keyword: null,
        duration: "days",
        source_filter: 0,
        start_date: "",
        interval: 30,
        range_filter: 4,
        type: "searching",
      },
      search_Menu: false,
      searchKeyword: "",
      timeFilter: false,
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
      shareLoader: false,
      resSearchRecommend: [],
      sentimentalityStatus: null,
      newSearchingResults: [],
    };

    this.toggleSearch = this.toggleSearch.bind(this);
    this.myRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  loadSearchingKeyword = () => {
    try {
      const serializedState = localStorage.getItem("vnalert-search");
      if (serializedState === []) {
        this.setState({
          historySearch: [],
        });
      } else {
        const historySearch = JSON.parse(serializedState);
        this.setState({
          historySearch: [...historySearch],
        });
      }
    } catch (error) {
      return [];
    }
  };

  saveSearchingKeyword = (keyword) => {
    try {
      let historySearch = this.state.historySearch;
      if (historySearch.find((kw) => kw === keyword) === undefined) {
        if (historySearch.length === 8) {
          historySearch.pop();
        }
        this.setState(
          {
            historySearch: [keyword, ...historySearch],
          },
          () => {
            const historySearch = this.state.historySearch;
            const serializedState = JSON.stringify(historySearch);
            localStorage.setItem("vnalert-search", serializedState);
          }
        );
      }
    } catch (error) {}
  };

  chartClickHandler = (time) => {
    this.setState(
      {
        searchingParams: {
          ...this.state.searchingParams,
          page: 1,
          start_date: time,
          interval: time === "" ? this.state.searchingParams.interval : 1,
        },
        page: 1,
      },
      () =>
        this.props.searchingRequest({ ...this.state.searchingParams, page: 1 })
    );
  };

  getShareLink = (url, title, feature_url) => {
    this.setState({ shareLoader: true });
    getShortLink(url, title, feature_url).then((link) => {
      this.setState({
        link: link,
        shareLoader: false,
      });
    });
  };

  copyKeywordLinkToClipboard = () => {
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

  getShareKeywordLink = () => {
    const url = `https://web.vnalert.vn/search?keyword=${this.state.searchingParams.keyword}`;
    const title = `Tìm kiếm "${this.state.searchKeyword}" trên VnAlert`;
    const feature_url =
      "https://vnalert.vn/wp-content/uploads/2021/04/Screen-Shot-2021-04-28-at-17.15.53.png";
    if (this.props.login.userKey !== null) {
      this.getShareLink(url, title, feature_url);
      this.setState({
        isModal: true,
      });
    } else {
      this.setState({
        isLoginRequirement: true,
      });
    }
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

  closeLoginRequirementModal = () => {
    this.setState({
      isLoginRequirement: false,
    });
  };

  // copyArticleLink = (url, title, feature_url) => {
  //   getShortLink(url, title, feature_url)
  //     .then((link) => {
  //       this.setState({
  //         link: link,
  //         // isCopy: true
  //       });
  //     })
  //     .then(() => document.getElementById("copy-to-clipboard").click());
  // };

  copyArticleLink = async (url) => {
    await this.setState({
      link: url,
    });
    document.getElementById("copy-to-clipboard").click();
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
          searchingParams: {
            ...this.state.searchingParams,
            page: 1,
            start_date: "",
            duration: "hours",
            interval: 6,
          },
          searchingStatisticsParams: {
            ...this.state.searchingStatisticsParams,
            duration: "hours",
            interval: 6,
          },
        },
        () => {
          this.props.searchingRequest(this.state.searchingParams);
          this.props.searchingStatisticsRequest(
            this.state.searchingStatisticsParams
          );
          this.props.history.push(
            `/search?keyword=${this.state.searchingParams.keyword}`
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
          searchingParams: {
            ...this.state.searchingParams,
            page: 1,
            start_date: "",
            duration: "hours",
            interval: 12,
          },
          searchingStatisticsParams: {
            ...this.state.searchingStatisticsParams,
            duration: "hours",
            interval: 12,
          },
        },
        () => {
          this.props.history.push(
            `/search?keyword=${this.state.searchingParams.keyword}`
          );
          this.props.searchingRequest(this.state.searchingParams);
          this.props.searchingStatisticsRequest(
            this.state.searchingStatisticsParams
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
          searchingParams: {
            ...this.state.searchingParams,
            page: 1,
            start_date: "",
            duration: "hours",
            interval: 24,
          },
          searchingStatisticsParams: {
            ...this.state.searchingStatisticsParams,
            duration: "hours",
            interval: 24,
          },
        },
        () => {
          this.props.history.push(
            `/search?keyword=${this.state.searchingParams.keyword}`
          );
          this.props.searchingRequest(this.state.searchingParams);
          this.props.searchingStatisticsRequest(
            this.state.searchingStatisticsParams
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
          searchingParams: {
            ...this.state.searchingParams,
            page: 1,
            start_date: "",
            duration: "days",
            interval: 7,
          },
          searchingStatisticsParams: {
            ...this.state.searchingStatisticsParams,
            duration: "days",
            interval: 7,
          },
        },
        () => {
          this.props.history.push(
            `/search?keyword=${this.state.searchingParams.keyword}`
          );
          this.props.searchingRequest(this.state.searchingParams);
          this.props.searchingStatisticsRequest(
            this.state.searchingStatisticsParams
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
          searchingParams: {
            ...this.state.searchingParams,

            page: 1,
            start_date: "",
            duration: "days",
            interval: 14,
          },
          searchingStatisticsParams: {
            ...this.state.searchingStatisticsParams,

            source_filter: 0,
            duration: "days",
            interval: 14,
          },
        },
        () => {
          this.props.history.push(
            `/search?keyword=${this.state.searchingParams.keyword}`
          );
          this.props.searchingRequest(this.state.searchingParams);
          this.props.searchingStatisticsRequest(
            this.state.searchingStatisticsParams
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
          searchingParams: {
            ...this.state.searchingParams,

            page: 1,
            start_date: "",
            duration: "days",
            interval: 30,
          },
          searchingStatisticsParams: {
            ...this.state.searchingStatisticsParams,

            source_filter: 0,
            duration: "days",
            interval: 30,
          },
        },
        () => {
          this.props.history.push(
            `/search?keyword=${this.state.searchingParams.keyword}`
          );
          this.props.searchingRequest(this.state.searchingParams);
          this.props.searchingStatisticsRequest(
            this.state.searchingStatisticsParams
          );
        }
      );
    }
  }

  // pageArr = (resultsCount) => {
  //   let i = 1;
  //   let pages = [];
  //   let maxPage =
  //     resultsCount / 20 === 5 ? resultsCount / 20 : resultsCount / 20 + 1;
  //   if (resultsCount / 20 <= 5 && resultsCount % 20 === 0) {
  //     maxPage = resultsCount / 20;
  //   }
  //   while (i <= maxPage) {
  //     pages = [...pages, i];
  //     i++;
  //   }
  //   return pages;
  // };
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
  // create a state for res recommend search and setState in axios => check res recommed and map to search modal
  debounced = debounce((keyword) => {
    var config = {
      method: "get",
      url: `${api_v1}/search_trends/?keyword=${keyword}`,
    };

    axios(config)
      .then((response) => {
        this.setState({
          resSearchRecommend: response.data.keywords,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, 390);

  onChangeInput = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    });
    this.debounced(e.target.value);
  };

  handleSearch = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.saveSearchingKeyword(this.state.searchKeyword);
    const rangeFilterValue = this.rangeFilterValue(this.state.rangeFilter);
    this.props.history.push(`/search?keyword=${this.state.searchKeyword}`);
    this.setState(
      {
        page: 1,
        displayKeyword: this.state.searchKeyword,
        isFirstload: false,
        searchingParams: {
          ...this.state.searchingParams,
          keyword: this.state.searchKeyword,
          range_filter: rangeFilterValue,
          page: 1,
          duration: this.state.duration,
          interval: this.state.interval,
        },
        searchingStatisticsParams: {
          ...this.state.searchingStatisticsParams,
          keyword: this.state.searchKeyword,
          interval: this.state.interval,
          source_filter: 0,
          range_filter: rangeFilterValue,
          duration: this.state.duration,
        },
      },
      () => {
        this.props.searchingRequest(this.state.searchingParams);
        this.props.searchingStatisticsRequest(
          this.state.searchingStatisticsParams
        );
      }
    );
  };

  historySearchClick = (e) => {
    const searchKeyword = e.target.textContent.trim();
    this.setState(
      {
        searchKeyword: searchKeyword,
        focusSearchBox: false,
      },
      () => this.search()
    );
  };

  componentDidMount() {
    try {
      const url = window.location.href.replace(/&amp;/g, "&");
      this.loadSearchingKeyword();
      if (url.search("keyword") !== -1) {
        const params = new URL(url).searchParams;
        const keyword = params.get("keyword");

        this.setState(
          {
            isFirstload: false,
            displayKeyword: keyword,
            searchKeyword: keyword,
            openPopup: false,
            articlePk: null,
            searchingParams: {
              ...this.state.searchingParams,
              keyword: keyword,
            },
            searchingStatisticsParams: {
              ...this.state.searchingStatisticsParams,
              keyword: keyword,
            },
          },
          () => {
            this.saveSearchingKeyword(this.state.searchKeyword);
            this.props.searchingRequest(this.state.searchingParams);
            this.props.searchingStatisticsRequest(
              this.state.searchingStatisticsParams
            );
          }
        );
      }
      document.addEventListener("mousedown", this.handleClickOutside);
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        focusSearchBox: false,
      });
    }
  }

  hideModal = () => {
    this.setState({
      isModal: false,
    });
  };

  hidePopup = () => {
    this.setState({ openPopup: false });
  };

  showPopup = () => {
    this.setState({ openPopup: true });
  };

  componentDidUpdate() {}

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
          ? this.props.searching.results
          : this.state.newSearchingResults;
      const newResult = oldResult.map((item) => {
        if (item.pk === article_pk) {
          return { ...item, sentimentality: [`${sentimentality}`] };
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
  ////

  fil = (filter, type) => {
    var newState = this.state.searchingParams;

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

  handleFilter = debounce((filter, type) => {
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
        searchingParams: newStateKeyword,
        page: 1,
      },
      () => this.props.searchingRequest(newStateKeyword)
    );
  }, 420);

  render() {
    const pages = [1, 2, 3, 4, 5];
    const arrSentimentality = [1, 2, 3];

    const results = (results) =>
      results.map((post, index) => {
        const source_type = post.source_type ? post.source_type[0] : 1;
        const sentimentality = post.sentimentality
          ? post.sentimentality[0]
          : "3";
        return this.sourceFilterCheck(source_type) &&
          this.sentimentalityFilterCheck(sentimentality) ? (
          <>
            <tr>
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
                        href={post.href}
                        target="_blank"
                        style={{ color: "#495057" }}
                      >
                        {post.title}
                      </a>
                      {post.summary !== null && post.summary !== "" && (
                        <span className="ml-2">
                          <Link
                            to={`/summary-article?pk=${post.pk}`}
                            target="_blank"
                          >
                            Xem tóm tắt{" "}
                            <i class="bx bx-link-external font-size-12"></i>
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
                          onClick={() => this.getShareArticleLink(post.pk)}
                        >
                          <i className="bx bx-share-alt font-size-16 mr-2"></i>
                          Chia sẻ bài viết
                        </DropdownItem> */}
                        {/* {post.summary !== null && post.summary !== "" && (
                          <DropdownItem
                            className="d-flex align-items-center"
                            onClick={() => this.getShareSummaryLink(post.pk)}
                          >
                            <i className="bx bx-share-alt font-size-16 mr-2"></i>
                            Chia sẻ tin tóm tắt
                          </DropdownItem>
                        )} */}

                        <DropdownItem
                          className="d-flex align-items-center"
                          onClick={() => this.copyArticleLink(post.href)}
                        >
                          <i className="bx bx-link font-size-16 mr-2"></i>
                          Sao chép liên kết
                        </DropdownItem>
                        <DropdownItem
                          className="d-flex align-items-center"
                          onClick={() =>
                            this.setState({
                              openPopup: true,
                              articlePk: post.pk,
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
                    {post.description}
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
                    {source_type ? (
                      <img
                        src={utils.iconSource(source_type)}
                        alt=""
                        height="14"
                        className="mr-1"
                      />
                    ) : (
                      <img
                        src={utils.iconSource(1)}
                        alt=""
                        height="14"
                        className="mr-1"
                      />
                    )}

                    <small>
                      {" "}
                      {utils.relativeTime(post.publish_date)} - {post.source}
                    </small>
                  </p>
                </div>
                <div className="d-flex flex-row mt-2">
                  {arrSentimentality.map((sentimen) => {
                    if (sentimen == sentimentality) {
                      return (
                        <Badge
                          className={`font-size-12 p-1 mr-2 badge-soft-${utils.sentimentalityColor(
                            sentimen
                          )}`}
                          color={utils.sentimentalityColor(sentimen)}
                          style={{ borderRadius: "4px" }}
                          pill
                          // onClick={() => this.handleSentimentality(post.pk, sentimen)} article_pk, mention_pk, sentimentality, session_id, screen_type, keyword
                        >
                          {utils.sentimentalityText(sentimen)}
                        </Badge>
                      );
                    }
                    return (
                      <Badge
                        className={`cursor-pointer font-size-12 p-1 mr-2 badge-soft-secondary`}
                        color={utils.sentimentalityColor(sentimen)}
                        style={{ borderRadius: "4px" }}
                        pill
                        onClick={() =>
                          this.handleSentimentality(
                            post.pk,
                            null,
                            sentimen,
                            null,
                            2,
                            this.state.searchKeyword
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
            {/* {post.summary ? (
            <div
              className="btn-show"
              onClick={() => this.collapseOpen(index)}
              style={{ marginBottom: "1rem" }}
            >
              {this.state.isOpen && this.state.currentPost === index ? (
                <div onMouseOver={{ cursor: "pointer" }} className="d-flex">
                  <p className="show-ct-h">Ẩn</p>
                </div>
              ) : (
                <div className="d-flex">
                </div>
              )}
            </div>
          ) : null}
          {post.summary ? (
            <Collapse
              className="summary"
              isOpen={this.state.isOpen && this.state.currentPost === index}
            >
              <Card>
                <CardBody>{post.summary}</CardBody>
              </Card>
            </Collapse>
          ) : null} */}
          </>
        ) : null;
      });

    if (this.state.error) {
      return <CrashPage />;
    }

    if (this.state.sentimentalityStatus !== null) {
      setTimeout(() => {
        this.setState({
          sentimentalityStatus: null,
        });
      }, 3000);
    }

    return (
      <ErrorBoundary>
        <React.Fragment>
          {this.state.shareLoader && (
            <div className="d-flex justify-content-center align-items-center position-fixed spinner-loader">
              <div style={{ opacity: 1 }}>
                <img src={SpinnerLoader} alt="" />
              </div>
            </div>
          )}
          <div className="page-content">
            <Container fluid style={{ position: "relative" }}>
              <CopyToClipboard
                id="copy-to-clipboard"
                onCopy={this.onCopy}
                text={this.state.link}
              >
                <span></span>
              </CopyToClipboard>
              <LoginRequirementModal
                isOpen={this.state.isLoginRequirement}
                closeModal={this.closeLoginRequirementModal}
              />
              <BookmarkPopup
                isOpen={this.state.openPopup}
                hide={this.hidePopup}
                show={this.showPopup}
                type="article"
                articlePk={this.state.articlePk}
              />
              {!this.state.shareLoader && (
                <ButtonsCarousel
                  copy={this.copyKeywordLinkToClipboard}
                  isModal={this.state.isModal}
                  url={this.state.link}
                  shareText={`Tìm kiếm "${this.state.searchKeyword}" trên VnAlert`}
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
                      <i className="bx bx-check-circle mr-2 font-size-16"></i>{" "}
                      Cập nhật thành công
                    </span>
                  ) : (
                    <span>
                      <i className="bx bx-error-circle mr-2 font-size-16"></i>{" "}
                      Cập nhật thất bại
                    </span>
                  )}
                </Alert>
              )}
              {/* Render Breadcrumb */}
              {/* <Breadcrumbs title="" breadcrumbItem="" /> */}
              <Row>
                <Col xs="12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4>Tìm kiếm bài viết</h4>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg="9" className="mb-4">
                  <div
                    ref={this.setWrapperRef}
                    className="search-box chat-search-box col-lg-12 p-0"
                    style={
                      !this.state.focusSearchBox
                        ? { borderRadius: 20, backgroundColor: "#fff" }
                        : {
                            borderRadius: 20,
                            backgroundColor: "#fff",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          }
                    }
                  >
                    <div className="position-relative">
                      <i
                        className="bx bx-search-alt search-icon"
                        style={{ cursor: "pointer" }}
                        onClick={this.search}
                      ></i>
                      <input
                        value={this.state.searchKeyword}
                        style={{
                          borderRadius: this.state.focusSearchBox ? 20 : 20,
                        }}
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa. VD: Giá vàng..."
                        onKeyDown={this.handleSearch}
                        onChange={this.onChangeInput}
                        onFocus={() => this.setState({ focusSearchBox: true })}
                      />
                    </div>
                    {this.state.focusSearchBox && (
                      <div
                        style={{
                          paddingLeft: 13,
                          paddingRight: 13,
                          paddingBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#E6E7EA",
                            height: 1,
                            marginBottom: "0.75rem",
                          }}
                        />
                        {this.state.resSearchRecommend.length !== 0 &&
                          this.state.resSearchRecommend.map((keyword, key) => {
                            if (key < 8)
                              return (
                                <p
                                  className="mb-1 cursor-pointer text-underline"
                                  onClick={this.historySearchClick}
                                >
                                  <i className="bx bx-search-alt-2 mr-1"></i>{" "}
                                  {keyword}
                                </p>
                              );
                          })}
                        {this.state.historySearch.map((keyword, key) => {
                          if (key + this.state.resSearchRecommend.length < 8)
                            return (
                              <p
                                className="mb-1 cursor-pointer text-underline"
                                onClick={this.historySearchClick}
                              >
                                <i className="bx bx-time-five mr-1"></i>{" "}
                                {keyword}
                              </p>
                            );
                        })}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              {this.props.searching && !this.state.isFirstload ? (
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
                                {this.state.displayKeyword}
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
                                        this.state.searchingStatisticsParams
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
                                      >
                                        {filter.title}
                                      </DropdownItem>
                                    ))}
                                  </DropdownMenu>
                                </ButtonDropdown>
                              </div>
                            </div>
                            <Nav pills justified>
                              <NavItem>
                                <Link
                                  to={{
                                    pathname: "/alert-create",
                                    state: {
                                      keyword: this.state.displayKeyword,
                                    },
                                  }}
                                >
                                  <NavLink
                                    className="active"
                                    onClick={() => {
                                      // this.toggleTab("1");
                                    }}
                                  >
                                    {/* <i className="bx bx-chat font-size-20 d-sm-none"></i> */}
                                    {/* <span className="d-sm-none">
                                      Cảnh báo chủ đề này
                                    </span> */}
                                    <span className="d-sm-block">
                                      Theo dõi chủ đề
                                    </span>
                                  </NavLink>
                                </Link>
                              </NavItem>
                              <NavItem style={{ backgroundColor: "#F8F8F8" }}>
                                <NavLink
                                  // className={classnames({ active: this.state.activeTab === '2' })}
                                  onClick={() => {
                                    this.toggleTab();
                                  }}
                                >
                                  {/* <span className="d-sm-none">
                                    {this.state.activeTab
                                      ? "Ẩn biểu đồ"
                                      : "Hiện biểu đồ"}
                                  </span> */}
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
                                <SearchExport
                                  keyword={this.state.displayKeyword}
                                >
                                  <button
                                    type="button"
                                    className="btn waves-effect waves-light align-items-center d-flex mr-2"
                                    style={{ backgroundColor: "#F8F8F8" }}
                                    onClick={() => {
                                      if (this.props.login.userKey === null) {
                                        this.setState({
                                          isLoginRequirement: true,
                                        });
                                      }
                                    }}
                                  >
                                    Tải danh sách tin (EXCEL)
                                    <i className="fas fa-file-download font-size-12 align-middle ml-2"></i>
                                  </button>
                                </SearchExport>

                                {/* <button
                                  type="button"
                                  className="btn waves-effect waves-light align-items-center d-flex"
                                  style={{ backgroundColor: "#F8F8F8" }}
                                  onClick={this.getShareKeywordLink}
                                >
                                  Chia sẻ
                                  <i className="fas fa-share font-size-12 align-middle ml-2"></i>
                                </button> */}
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="">
                              {!this.props.loading &&
                                this.props.searching.results.length === 0 && (
                                  <h6
                                    className="d-flex text-muted align-items-center justify-content-center"
                                    style={{ margin: 0 }}
                                  >
                                    Không tìm thấy kết quả. Hãy thử lại với cụm
                                    từ chi tiết hơn VD: "giá vàng hôm nay" thay
                                    "giá vàng"
                                  </h6>
                                )}

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
                                    this.props.searching.results &&
                                    this.props.searching.results.length > 0 &&
                                    this.state.newSearchingResults.length === 0
                                      ? results(this.props.searching.results)
                                      : results(this.state.newSearchingResults)}
                                  </tbody>
                                </Table>
                              </div>
                              <nav aria-label="...">
                                <ul className="pagination justify-content-center">
                                  {this.pageArr(this.props.searching.count).map(
                                    (page) => {
                                      return this.state.page === page ? (
                                        <li className="page-item active ml-1 mr-1">
                                          <Link
                                            style={{
                                              width: "34px",
                                              borderRadius: "50%",
                                            }}
                                            className="page-link justify-content-center d-flex"
                                            to={`/search?keyword=${this.state.searchingParams.keyword}`}
                                            onClick={() => {
                                              this.executeScroll();
                                              this.setState(
                                                {
                                                  searchingParams: {
                                                    ...this.state
                                                      .searchingParams,
                                                    page: page,
                                                  },
                                                },
                                                () =>
                                                  this.props.searchingRequest(
                                                    this.state.searchingParams
                                                  )
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
                                        <li className="page-item ml-1 mr-1">
                                          <Link
                                            style={{
                                              width: "34px",
                                              borderRadius: "50%",
                                            }}
                                            className="page-link justify-content-center d-flex"
                                            to={`/search?keyword=${this.state.searchingParams.keyword}`}
                                            onClick={() => {
                                              this.executeScroll();
                                              this.setState(
                                                {
                                                  searchingParams: {
                                                    ...this.state
                                                      .searchingParams,
                                                    page: page,
                                                  },
                                                  page: page,
                                                },
                                                () =>
                                                  this.props.searchingRequest(
                                                    this.state.searchingParams
                                                  )
                                              );
                                            }}
                                          >
                                            {page}
                                          </Link>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </nav>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>

                  <Col lg="3">
                    {/* response ,them class cho cac filter*/}
                    <Row className="responsefilter">
                      <Col className="">
                        <div className="mb-2">
                          <h6 className="mb-4">Nguồn tin</h6>
                        </div>

                        <div className=" button-items mb-4">
                          <button
                            type="button"
                            className="btn waves-effect waves-light d-flex align-items-center justify-content-between button-width-filter response-ipad"
                            style={{
                              backgroundColor: "#fff",
                              borderColor: "#fff",
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
                            className="btn waves-effect waves-light d-flex align-items-center justify-content-between button-width-filter response-ipad"
                            style={{
                              backgroundColor: "#fff",
                              borderColor: "#fff",
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
                            className="btn waves-effect waves-light d-flex align-items-center justify-content-between button-width-filter response-ipad"
                            style={{
                              backgroundColor: "#fff",
                              borderColor: "#fff",
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
                            className="btn waves-effect waves-light d-flex align-items-center justify-content-between button-width-filter response-ipad"
                            style={{
                              backgroundColor: "#fff",
                              borderColor: "#fff",
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

                      <Col className="flex-max-width">
                        <div className="mb-4">
                          <h6>Tính chất thông tin</h6>
                        </div>

                        <div className=" button-items mb-2">
                          <button
                            type="button"
                            className="btn waves-effect waves-light d-flex align-items-center justify-content-between button-width-filter response-ipad"
                            style={{
                              backgroundColor: "#fff",
                              borderColor: "#fff",
                              //
                            }}
                            onClick={() =>
                              this.handleFilter("sentimentality", 1)
                            }
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
                            className="btn waves-effect waves-light d-flex align-items-center justify-content-between button-width-filter response-ipad"
                            style={{
                              backgroundColor: "#fff",
                              borderColor: "#fff",
                            }}
                            onClick={() =>
                              this.handleFilter("sentimentality", 2)
                            }
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
                            className="btn waves-effect waves-light d-flex align-items-center justify-content-between button-width-filter response-ipad"
                            style={{
                              backgroundColor: "#fff",
                              borderColor: "#fff",
                            }}
                            onClick={() =>
                              this.handleFilter("sentimentality", 3)
                            }
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
              ) : !this.state.focusSearchBox ? (
                <Row className="mb-5">
                  <Col
                    lg="9"
                    className="bg-white mx-2"
                    style={{ borderRadius: "2.2rem" }}
                  >
                    <div className="page-title-box ml-3 pt-3">
                      <h6>Tìm kiếm gần đây</h6>
                      <div
                        style={{
                          paddingLeft: 13,
                          paddingRight: 13,
                          paddingBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#E6E7EA",
                            height: 1,
                            marginBottom: "0.75rem",
                          }}
                        />
                        {this.state.historySearch.map((keyword, key) => {
                          if (key < 8)
                            return (
                              <p
                                className="mb-1 cursor-pointer text-underline"
                                onClick={this.historySearchClick}
                              >
                                <i className="bx bx-time-five mr-1"></i>{" "}
                                {keyword}
                              </p>
                            );
                        })}
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : null}
            </Container>
          </div>
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searching: state.Searching.searchingData,
    loading: state.Searching.loading,
    statisticsLoading: state.SearchingStatistics.loading,
    login: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchingRequest: (searchingParams) => {
      dispatch({
        type: "KEYWORD_SEARCHING_REQUEST",
        payload: searchingParams,
      });
    },
    searchingStatisticsRequest: (searchingStatisticsParams) => {
      dispatch({
        type: "KEYWORD_SEARCHING_STATISTICS_REQUEST",
        payload: searchingStatisticsParams,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchKeyword));
