import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import {
  Badge,
  CardBody,
  CardTitle,
  Table,
  Container,
  Row,
  Col,
  Alert,
  Media,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  TabContent,
  TabPane,
  Card,
  Tooltip,
  Modal
} from "reactstrap";
import classnames from "classnames";
import * as ultils from "../../utils/post";
import { getShortLink, copyToClipboard } from "../../utils/shortLink";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import axios from "axios";

//Import Images

import empty from "../../assets/images/empty.svg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { data } from "./data";
import { focus } from "redux-form";

import CrashPage from "../Error/CrashPage";
import ErrorBoundary from "../Error/ErrorBoundary";
import ButtonsCarousel from "../../components/CommonForBoth/SocialSharing/ButtonsCarousel";
import { api_v1 } from "../../services/api";
import {
  BookmarkComponentOnMobile,
  BookmarkComponentOnPC,
} from "./BookmarkComponents";
import ProgressiveImage from "../../components/CommonForBoth/ProgressiveImage";
import SpinnerLoader from "../../assets/images/spinnerLoader.svg";

const fontAwesomeStyle = {
  textAlign: "center",
  width: "1.25em",
  height: "1em",
  fill: "white",
  verticalAlign: "-0.25em",
};

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBookmarkName: null,
      editBookmarkPk: null,
      isModal: false,
      error: false,
      isCopy: false,
      bookmarkPosts: [],
      isAdd: false,
      newBookmark: "",
      notification_Menu: false,
      search_Menu: false,
      settings_Menu: false,
      other_Menu: false,
      activeTab: "1",
      bookmarkName: "",
      Chat_Box_Username2: "Henry Wells",
      Chat_Box_User_Status: "online",
      Chat_Box_User_isActive: false,
      curMessage: "",
      searchBookmarks: null,

      screenWidth: window.innerWidth,
      isShow: false,
      shareLoader: false,
      exportStatus: null,
      deleteStatus: null,
      showAlert: null,
      delBookmarkPK: null,
      delModalOpend: false,
    };
    this.toggleNotification = this.toggleNotification.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleOther = this.toggleOther.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.UserChatOpen = this.UserChatOpen.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  export = (bookmark_pk, key) => {
    this.setState({
      shareLoader: true,
    });
    var data = JSON.stringify({
      bookmark_pk: bookmark_pk,
      type: "excel",
    });

    var config = {
      method: "post",
      url: api_v1 + "/export_bookmark/?format=json",
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
      responseType: "blob",
    };

    axios(config)
      .then((response) => {
        this.setState({
          shareLoader: false,
          exportStatus: true,
        });
        const fileName = this.state.bookmarkName + ".xlsx";
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

  copyArticleLink = async (url) => {
    await this.setState({
      link: url,
    });
    document.getElementById("copy-to-clipboard").click();
  };

  copyKeywordLinkToClipboard = () => {
    document.getElementById("copy-to-clipboard").click();
  };

  getShareArticleLink = (pk) => {
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
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({
        isLoginRequirement: true,
      });
    }
  };

  getShareLink = (url, title, feature_url) => {
    getShortLink(url, title, feature_url).then((link) => {
      this.setState({
        link: link,
      });
    });
  };

  getSummaryLink = (pk) => {
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
            isModal: true,
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
  openModal = (pk) => {
    this.setState({
      delModalOpend: true,
      delBookmarkPK: pk,
    });
  };

  hideModal = () => {
    this.setState({
      isModal: false,
    });
  };

  toggleNotification() {
    this.setState((prevState) => ({
      notification_Menu: !prevState.notification_Menu,
    }));
  }

  //Toggle Chat Box Menus
  toggleSearch() {
    this.setState((prevState) => ({
      search_Menu: !prevState.search_Menu,
    }));
  }

  toggleOther() {
    this.setState((prevState) => ({
      other_Menu: !prevState.other_Menu,
    }));
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  //Use For Chat Box
  UserChatOpen = (id, name, status) => {
    let chatModule = [...this.state.chats];
  };

  onSearchBookmarks = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.searchBookmarkPost(e.target.value);
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      const openBookmark = this.props.userBookmarks.results[0];
      this.setState(
        {
          searchBookmarks: null,
        },
        () =>
          this.openBookmark(
            openBookmark.pk,
            openBookmark.name,
            openBookmark.mentions
          )
      );
    }
  };

  searchBookmarkPost = (searchString) => {
    if (this.props.userBookmarks.results) {
      const searchBookmarks = this.props.userBookmarks.results.map(
        (bookmark) => {
          const searchBookmarkPost = bookmark.mentions.filter(
            (post) => post.article.title.search(searchString) !== -1
          );
          return {
            ...bookmark,
            mentions: searchBookmarkPost,
          };
        }
      );
      const openBookmark = searchBookmarks.find(
        (bookmark) => bookmark.mentions.length > 0
      );
      this.setState(
        {
          searchBookmarks: searchBookmarks,
        },
        () => {
          if (openBookmark) {
            this.openBookmark(
              openBookmark.pk,
              openBookmark.name,
              openBookmark.mentions
            );
          }
        }
      );
    }
  };

  createBook = (name, bookmarkRequest, key) => {
    const data = JSON.stringify({ name: name });

    const config = {
      method: "post",
      url: api_v1 + "/bookmarks/?format=json",
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        bookmarkRequest(key);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  delBookmark = (pk, bookmarkRequest, key) => {
    this.setState({
      shareLoader: true,
      delModalOpend: false,
    })
    const data = JSON.stringify({});

    const config = {
      method: "delete",
      url: `${api_v1}/bookmarks/${pk}/?format=json`,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        bookmarkRequest(key);
        if (this.props.userBookmarks.results !== undefined || this.props.userBookmarks.results.length !== 0) {
          const bookmark = this.props.userBookmarks.results.filter(item => item.pk !== pk)[0];
          this.openBookmark(bookmark.pk, bookmark.name, bookmark.mentions);
        } else {
          this.openBookmark(null, "Bạn chưa có nhóm lưu trữ nào.", [])
        }
        this.setState({
          deleteStatus: true,
          shareLoader: false,
        });
      })
      .catch((error) => {
        bookmarkRequest(key);
        this.setState({
          deleteStatus: true,
          shareLoader: false,
        });
      });
  };

  editBookmark = (pk, newName, bookmarkRequest, key) => {
    this.setState({
      shareLoader: true,
    })
    const data = JSON.stringify({
      name: newName,
    });

    const config = {
      method: "patch",
      url: `${api_v1}/bookmarks/${pk}/?format=json`,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        bookmarkRequest(key);
        this.setState({
          shareLoader: false,
          showAlert: true
        });
      })
      .catch((error) => {
        bookmarkRequest(key);
        this.setState({
          shareLoader: false,
          showAlert: false
        });
      });
  };

  mentionUnsetBookmark = (mentionPk, bookmarkPk, bookmarkRequest, key) => {
    const config = {
      method: "delete",
      url: `${api_v1}/mentions/${mentionPk}/bookmark?format=json`,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: {
        bookmark_pk: bookmarkPk,
      },
    };

    axios(config)
      .then((response) => {
        bookmarkRequest(key);
        const newBookmarkPosts = this.state.bookmarkPosts.filter(item => item.pk !== mentionPk);
        this.setState({ bookmarkPosts: newBookmarkPosts })
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  openBookmark = (pk, name, mentions) => {
    this.setState({
      bookmarkName: name,
      activeBookmark: pk,
      bookmarkPosts: mentions,
    });
  };

  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  componentWillMount() {
    window.removeEventListener("resize", this.updateWindowDimensions());
  }

  componentDidMount() {
    this.props.userBookmarksRequest(this.props.login.userKey.key);
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentDidUpdate(prevState, nextStates) {
    try {
      if (
        this.state.bookmarkName === "" &&
        this.props.userBookmarks.results !== undefined
      ) {
        const bookmark = this.props.userBookmarks.results[0];
        this.openBookmark(bookmark.pk, bookmark.name, bookmark.mentions);
      }
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  addMessage() {
    let d = new Date();
    var n = d.getSeconds();
    let demoMsg = this.state.messages;
    demoMsg.push({
      isRight: true,
      name: this.state.Chat_Box_Username2,
      message: this.state.curMessage,
      time: "00:" + n,
    });
    this.setState({ messages: demoMsg, curMessage: "" });
  }

  addToggle = (isAdd) => {
    this.setState({
      isAdd: !isAdd,
    });
  };

  handleClickMobile = (bookmark) => {
    this.openBookmark(bookmark.pk, bookmark.name, bookmark.mentions);
    if (this.state.screenWidth < 992) {
      this.setState({ isShow: true });
    } else {
      this.setState({ isShow: false });
    }
  };
  isHide = (value) => {
    this.setState({ isShow: value });
  };
///



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
///
  render() {
    if (this.state.deleteStatus !== null || this.state.exportStatus !== null || this.state.showAlert !== null) {
      setTimeout(() => {
        this.setState({
          exportStatus: null,
          deleteStatus: null,
          showAlert: null,
        })
      }, 3000);
    }
    const userBookmarks = !this.state.searchBookmarks
      ? this.props.userBookmarks.results
      : this.state.searchBookmarks;
    const bookmarkList = userBookmarks
      ? userBookmarks.map((bookmark) => (
        <li
          key={bookmark.pk}
          className={
            this.state.screenWidth >= 992
              ? this.state.activeBookmark === bookmark.pk
                ? "active"
                : ""
              : "active"
          }
        >

          <Link to="#">
            {this.state.editBookmarkPk !== bookmark.pk && (
              <>
                <div className="float-right">
                  <UncontrolledDropdown>
                    <DropdownToggle href="#" className="card-drop" tag="i">
                      <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        onClick={() =>
                          this.setState({
                            editBookmarkPk: bookmark.pk,
                          })
                        }
                      >
                        <i className="bx bx-edit-alt font-size-16 mr-2"></i>
                        Đổi tên lưu trữ
                      </DropdownItem>
                      <DropdownItem
                        onClick={() =>
                          this.export(
                            bookmark.pk,
                            this.props.login.userKey.key
                          )
                        }
                      >
                        <i className="bx bx-download font-size-16 mr-2"></i>
                        Tải danh sách tin (EXCEL) 
                      </DropdownItem>
                      <DropdownItem
                        onClick={() =>
                          this.openModal(bookmark.pk)
                        }
                      >
                        <i className="bx bx-trash font-size-16 mr-2"></i>
                        Xóa lưu trữ
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {this.state.screenWidth <= 992 ? (
                    <div
                      className="text-center"
                      style={{ marginTop: "10px" }}
                    >
                      <i className="fas fa-chevron-right fa-sm text-black-50"></i>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}

            <Media
              onClick={() => {
                this.handleClickMobile(bookmark);
              }}
            >
              <div className="align-self-center mr-3">
                <ProgressiveImage
                  src={
                    bookmark.feature_url || bookmark.feature_url !== ""
                      ? bookmark.feature_url
                      : empty
                  }
                  className="avatar-md-34"
                  alt=""
                  style={{ width: "96px", height: "72px" }}
                  placeholder={empty}
                />
              </div>

              <Media className="overflow-hidden" body>
                {this.state.editBookmarkPk !== bookmark.pk && (
                  <>
                    <h5 className="text-truncate font-size-14 mb-1">
                      {bookmark.name}
                    </h5>
                    <p className="text-truncate mb-0">
                      {bookmark.mentions.length} bài viết
                    </p>
                  </>
                )}

                {this.state.editBookmarkPk === bookmark.pk && (
                  <div
                    className="form-control d-flex align-items-center"
                    style={{ background: "none", padding: 0, border: "none" }}
                  >
                    <div className="align-items-baseline d-flex w-100">
                      <input
                        type="text"
                        className="mr-1 form-control-sm form-control"
                        autoFocus
                        aria-invalid="false"
                        value={this.state.newBookmarkName}
                        onChange={(e) =>
                          this.setState({ newBookmarkName: e.target.value })
                        }
                      />
                      <button
                        onClick={() => {
                          this.editBookmark(
                            this.state.editBookmarkPk,
                            this.state.newBookmarkName,
                            this.props.userBookmarksRequest,
                            this.props.login.userKey.key
                          );
                          this.setState({
                            editBookmarkPk: null,
                          });
                        }}
                        className="ml-auto mr-1 btn btn-success btn-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          style={fontAwesomeStyle}
                        >
                          <path
                            color="white"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          this.setState({
                            editBookmarkPk: null,
                          })
                        }
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 352 512"
                          style={fontAwesomeStyle}
                        >
                          <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </Media>
            </Media>
          </Link>
        </li>
      ))
      : null;

    if (this.state.error) {
      return <CrashPage />;
    }
    if (this.state.exportStatus !== null) {
      setTimeout(() => {
        this.setState({ exportStatus: null })
      }, 3000);
    }
    try {
      return (

        <React.Fragment>
          { this.state.shareLoader && <div className="d-flex justify-content-center align-items-center position-fixed spinner-loader">
            <div style={{opacity: 1}}>
              <img src={SpinnerLoader} />
            </div>
          </div>}
          <Modal
            isOpen={this.state.delModalOpend}
            toggle={() => {
              this.setState({ delModalOpend: false });
            }}
          >
            <div className="modal-header">
              <button
                type="button"
                onClick={() => this.setState({ delModalOpend: false })}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>Lưu trữ này sẽ bị xóa.</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => this.setState({ delModalOpend: false })}
                className="btn btn-secondary waves-effect"
                data-dismiss="modal"
              >
                Hủy
              </button>
              <button
                onClick={() => this.delBookmark(
                  this.state.delBookmarkPK,
                  this.props.userBookmarksRequest,
                  this.props.login.userKey.key
                )}
                type="button"
                className="btn btn-primary waves-effect waves-light"
              >
                Đồng ý
              </button>
            </div>
          </Modal>
          <div className="page-content">
            <Container fluid>

              <CopyToClipboard
                id="copy-to-clipboard"
                onCopy={this.onCopy}
                text={this.state.link}
              >
                <span></span>
              </CopyToClipboard>
              <ButtonsCarousel
                copy={this.copyKeywordLinkToClipboard}
                isModal={this.state.isModal}
                url={this.state.link}
                shareText={`Tìm kiếm "${this.state.searchKeyword}" trên VnAlert`}
                hide={this.hideModal}
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


                  {this.state.exportStatus ?
                    <><i
                      className="bx bx-check-circle mr-2 font-size-16"
                      style={{ color: "#5FC490" }}
                    ></i>Tải lưu trữ thành công</> :
                    <><i class="far fa-times-circle mr-2 font-size-16"></i>Tải lưu trữ thất bại
                    </>}
                </Alert>
              )}
              {/* / alert update //  */}
              {this.state.showAlert !== null && (
                <Alert
                  color={this.state.showAlert ? "success" : "danger"}
                  className="d-flex align-items-center"
                  style={{
                    width: 240,
                    position: "fixed",
                    left: "calc(50%-120px)",
                    bottom: "20px",
                    zIndex: 99999,
                  }}
                >


                  {this.state.showAlert ?
                    <><i
                      className="bx bx-check-circle mr-2 font-size-16"
                      style={{ color: "#5FC490" }}
                    ></i>Đổi tên lưu trữ thành công</> :
                    <><i class="far fa-times-circle mr-2 font-size-16"></i>Đổi tên lưu trữ thất bại
                    </>}
                </Alert>
              )}
              {/* // alert delte/ / */}

              {this.state.deleteStatus !== null && (
                <Alert
                  color={this.state.deleteStatus ? "success" : "danger"}
                  className="d-flex align-items-center"
                  style={{
                    width: 240,
                    position: "fixed",
                    left: "calc(50%-120px)",
                    bottom: "20px",
                    zIndex: 99999,
                  }}
                >


                  {this.state.deleteStatus ?
                    <><i
                      className="bx bx-check-circle mr-2 font-size-16"
                      style={{ color: "#5FC490" }}
                    ></i>Xoá lưu trữ thành công</> :
                    <><i class="far fa-times-circle mr-2 font-size-16"></i>Xóa lưu trữ thất bại
                    </>}
                </Alert>
              )}

              <Row>
                <Col xs="12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4>Quản lý lưu trữ</h4>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <div className="d-lg-flex">
                    <div className="chat-leftsidebar mr-lg-4">
                      <div className="h-100">
                        <div className="search-box chat-search-box pt-0">
                          <div className="position-relative">
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Tìm kiếm bài viết"
                              onKeyDown={(e) => this.onSearchBookmarks(e)}
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>

                        <div className="chat-leftsidebar-nav">
                          <TabContent
                            activeTab={this.state.activeTab}
                            className="pt-4"
                          >
                            <TabPane tabId="1">
                              <div>
                                <div className="d-flex justify-content-between ">
                                  <h5 className="font-size-14 mb-3">Nhóm lưu trữ</h5>
                                  <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.addToggle(this.state.isAdd)
                                    }
                                    className={
                                      this.state.isShow ? "d-none" : ""
                                    }
                                  >
                                    <i className="bx bx-list-plus float-right font-size-20"></i>
                                  </div>
                                </div>
                                <ul
                                  className={
                                    this.state.isShow
                                      ? "list-unstyled chat-list d-none"
                                      : "list-unstyled chat-list"
                                  }
                                >
                                  <PerfectScrollbar style={{ height: "410px" }}>
                                    {this.state.isAdd && (
                                      <li>
                                        <div
                                          className="align-items-baseline d-flex pb-2"
                                        // style={{
                                        //   paddingLeft: 16,
                                        //   paddingRight: 16,
                                        // }}
                                        >
                                          <input
                                            type="text"
                                            className="mr-1 form-control-sm form-control"
                                            aria-invalid="false"
                                            value={this.state.newBookmark}
                                            onChange={(e) =>
                                              this.setState({
                                                newBookmark: e.target.value,
                                              })
                                            }
                                            autoFocus
                                          />
                                          <button
                                            onClick={() => {
                                              this.createBook(
                                                this.state.newBookmark,
                                                this.props.userBookmarksRequest,
                                                this.props.login.userKey.key
                                              );
                                              this.setState({
                                                isAdd: false,
                                              });
                                            }}
                                            className="ml-auto mr-1 btn btn-success btn-sm"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 512 512"
                                              style={fontAwesomeStyle}
                                            >
                                              <path
                                                color="white"
                                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                                              ></path>
                                            </svg>
                                          </button>
                                          <button
                                            onClick={() =>
                                              this.setState({
                                                isAdd: false,
                                              })
                                            }
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 352 512"
                                              style={fontAwesomeStyle}
                                            >
                                              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                            </svg>
                                          </button>
                                        </div>
                                      </li>
                                    )}

                                    {bookmarkList}
                                  </PerfectScrollbar>
                                </ul>
                                <BookmarkComponentOnMobile
                                  props={{
                                    bookmarkName: this.state.bookmarkName,
                                    bookmarkPosts: this.state.bookmarkPosts,
                                    getShareArticleLink:
                                      this.getShareArticleLink,
                                    copyArticleLink: this.copyArticleLink,
                                    mentionUnsetBookmark:
                                      this.mentionUnsetBookmark,
                                    userBookmarksRequest:
                                      this.props.userBookmarksRequest,
                                    login: this.props.login,
                                    isShow: this.state.isShow,
                                    isHide: this.isHide,
                                    getSummaryLink: this.getSummaryLink
                                  }}
                                />
                              </div>
                            </TabPane>
                          </TabContent>
                        </div>
                      </div>
                    </div>
                    {this.state.screenWidth >= 992 && !this.state.isShow ? (
                      <BookmarkComponentOnPC
                        props={{
                          bookmarkName: this.state.bookmarkName,
                          bookmarkPosts: this.state.bookmarkPosts,
                          getShareArticleLink: this.getShareArticleLink,
                          copyArticleLink: this.copyArticleLink,
                          mentionUnsetBookmark: this.mentionUnsetBookmark,
                          userBookmarksRequest: this.props.userBookmarksRequest,
                          login: this.props.login,
                          getSummaryLink: this.getSummaryLink
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
      );
    } catch (error) {
      return <CrashPage />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.Login,
    userBookmarks: state.UserBookmarks.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userBookmarksRequest: (key) => {
      dispatch({
        type: "USER_BOOKMARKS_REQUEST",
        payload: key,
      });
    },
    articleMostReadRequest: (topic) => {
      dispatch({
        type: "ARTICLE_MOST_READ_REQUEST",
        payload: topic,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
