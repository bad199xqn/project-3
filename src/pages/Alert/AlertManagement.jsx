import React, { Component } from "react";
import {
  Input,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import ErrorBoundary from "../Error/ErrorBoundary";
import loader from "../../assets/images/vnalert.svg";

//Import Cards
import CardFolder from "./CardFolder";
import { api_v1 } from "../../services/api";
import SpinnerLoader from "../../assets/images/spinnerLoader.svg";
import { getShortLink, copyToClipboard } from "../../utils/shortLink";
import CopyToClipboard from "react-copy-to-clipboard";
import ButtonsCarousel from "../../components/CommonForBoth/SocialSharing/ButtonsCarousel";

const fontAwesomeStyle = {
  textAlign: "center",
  width: "1.25em",
  height: "1em",
  fill: "white",
  verticalAlign: "-0.25em",
};

class AlertManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFolder: false,
      newFolder: "",
      searchAlert: null,
      alertFolders: [],
      shareLoader: false,
      linkShare: "",
      isModal: false,
      isCopy: false,
      nameAlert: null,
      deleteStatus: null,
      exportStatus: null,
    };
  }



  onSearchAlert = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.searchAlert(e.target.value);
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      this.setState({
        searchAlert: null,
      });
    }
  };

  searchAlert = (searchString) => {
    if (this.props.alertFolders) {
      const searchFolders = this.props.alertFolders.map((folder) => {
        const searchAlerts = folder.child_alerts.filter(
          (alert) => alert.name.search(searchString) !== -1
        );
        return {
          ...folder,
          child_alerts: searchAlerts,
        };
      });
      this.setState({
        searchAlert: searchFolders,
      });
    }
  };

  deleteAlert = (alertPk) => {
    this.setState({
      shareLoader: true,
    })
    var data = "{\n\n}";

    var config = {
      method: "delete",
      url: `${api_v1}/alerts/${alertPk}/?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.props.alertFoldersRequest(this.props.login.userKey.key);
        this.setState({ 
          deleteStatus: true, 
          shareLoader: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ 
          deleteStatus: false, 
          shareLoader: false,
        });
      });
  };

  //Đổi tên nhóm cảnh báo
  editFolder = (folderPk, newName) => {
    const data = JSON.stringify({
      name: newName,
    });

    const config = {
      method: "patch",
      url: `${api_v1}/folders/${folderPk}/?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.props.alertFoldersRequest(this.props.login.userKey.key);
      })
      .catch((error) => {
        this.props.alertFoldersRequest(this.props.login.userKey.key);
      });
  };

  //Xóa nhóm cảnh báo
  delFolder = (folderPk) => {
    this.setState({
      shareLoader: true,
    })
    const config = {
      method: "delete",
      url: `${api_v1}/folders/${folderPk}/?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
        "Content-Type": "application/json",
      },
      data: {},
    };

    axios(config)
      .then((response) => {
        this.props.alertFoldersRequest(this.props.login.userKey.key);
        this.setState({ 
          deleteStatus: true, 
          shareLoader: false,
        });
      })
      .catch((error) => {
        this.props.alertFoldersRequest(this.props.login.userKey.key);
        this.setState({ 
          deleteStatus: false, 
          shareLoader: false,
        });
      });
  };

  //Tạo nhóm cảnh báo

  createFolder = (newFolder) => {
    let parentFolderPk = "";
    if (this.props.alertFolders) {
      this.props.alertFolders.find((folder) => {
        if (folder.name === "root_folder") {
          parentFolderPk = "" + folder.pk;
        }
      });
    }
    const config = {
      method: "post",
      url: `${api_v1}/folders/?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
        "Content-Type": "application/json",
      },
      data: {
        name: newFolder,
        parent_folder: parentFolderPk,
      },
    };

    axios(config)
      .then((response) => {
        this.props.alertFoldersRequest(this.props.login.userKey.key);
        this.setState({
          addFolder: false,
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  // Tải báo cáo
  exportAlert = (alert_pk, name) => {
    this.setState({
      shareLoader: true,
    })
    var data = JSON.stringify({
      alert_pk: alert_pk,
      type: "word",
      interval: 60,
    });

    var config = {
      method: "post",
      url: api_v1 + "/export_alert/?format=json",
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
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
        })
        const fileName = name + ".pdf";
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
        })
      });
  };

  componentDidMount() {
    this.props.alertFoldersRequest(this.props.login.userKey.key);
  }

  componentDidUpdate() {
    // console.log(this.state.searchAlert)
  }

  //chia sẻ nhóm cảnh báo
  getShareAlertLink = (alert) => {
    this.setState({ shareLoader: true, nameAlert: alert });
  
    var config = {
      method: "get",
      url: `${api_v1}/alerts/${alert.pk}/share?format=json`,
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
          linkShare: link,
          isModal: true,
          shareLoader: false,
        })
      })
      .catch((error) => {
        this.setState({ shareLoader: false, })
        console.log(error);
      });
  }
  copyAlertLinkToClipboard = () => document.getElementById("copy-to-clipboard").click();
  hideModal = () => this.setState({ isModal: false, nameAlert: null, });
  onCopy = () => {
    this.setState({ isCopy: true});
    setTimeout( () => this.setState({ isCopy: false }), 1500 );
  };  


  getShareAlertLinks = (alert) => {
    this.setState({ shareLoader: true });
    if (alert.public_token === null) {
      this.getPublicToken(alert.pk).then(
        (publicToken) => {
          const url = `https://web.vnalert.vn/alert-detail?displayKeyword=${alert.name}&p=${publicToken}`;
          const title = `Cảnh báo "${alert.name}" trên VnAlert`;
          const feature_url =
            "https://vnalert.vn/wp-content/uploads/2021/04/Screen-Shot-2021-04-28-at-17.15.53.png";
          this.getShareLink(url, title, feature_url);
          this.setState({
            isModal: true,
          });
        }
      );
    } else {
      const url = `https://web.vnalert.vn/alert-detail?displayKeyword=${alert.name}&p=${alert.public_token}`;
      const title = `Cảnh báo "${alert.name}" trên VnAlert`;
      const feature_url =
        "https://vnalert.vn/wp-content/uploads/2021/04/Screen-Shot-2021-04-28-at-17.15.53.png";
      this.getShareLink(url, title, feature_url);
      this.setState({
        isModal: true,
      });
    }
  };
  
  getShareLink = (url, title, feature_url) => {
    getShortLink(url, title, feature_url).then((link) => {
      this.setState({
        linkShare: link,
        shareLoader: false,
      });
    });
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
      .catch(function (error) { });
  };
  
  render() {
    if(this.state.deleteStatus !== null || this.state.exportStatus !== null){
      setTimeout(() => {
        this.setState({
          exportStatus: null,
          deleteStatus: null,
        })
      }, 3000);
    }
    return (
      <ErrorBoundary>
        <React.Fragment>
        { this.state.shareLoader && <div className="d-flex justify-content-center align-items-center position-fixed spinner-loader">
          <div style={{opacity: 1}}>
            <img src={SpinnerLoader} />
          </div>
        </div>}
          <div className="page-content">
            <Container fluid>
              <CopyToClipboard
                id="copy-to-clipboard"
                onCopy={this.onCopy}
                text={this.state.linkShare}
              >
                <span></span>
              </CopyToClipboard>
              { !this.state.shareLoader && <ButtonsCarousel
                copy={this.copyAlertLinkToClipboard}
                isModal={this.state.isModal}
                url={this.state.linkShare}
                shareText={`Nhóm cảnh báo "${this.state.nameAlert && this.state.nameAlert.name}" trên VnAlert`}
                hide={this.hideModal}
              />}
              { this.state.isCopy && (
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
            {/* alert delete */}
              { this.state.deleteStatus !== null || this.state.exportStatus !== null ? (
                <Alert
                  color={this.state.deleteStatus || this.state.exportStatus ? "success" : "danger"}
                  className="d-flex align-items-center"
                  style={{
                    width: 240,
                    position: "fixed",
                    left: "calc(50%-120px)",
                    bottom: "20px",
                    zIndex: 99999,
                  }}
                >
                  
                  {this.state.deleteStatus !== null ? (this.state.deleteStatus ? <><i className="bx bx-check-circle mr-2 font-size-16" style={{ color: "#5FC490" }} ></i>Xóa thành công</> : <><i className="far fa-times-circle mr-2 font-size-16"></i>Xóa thất bại</>) : ''}
                  {this.state.exportStatus !== null ? (this.state.exportStatus ? <><i className="bx bx-check-circle mr-2 font-size-16" style={{ color: "#5FC490" }} ></i>Tải báo cáo thành công</> : <><i className="far fa-times-circle mr-2 font-size-16"></i>Tải báo cáo thất bại</>) : null}
                </Alert>
              ): null}

              <Row>
                <Col xs="12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4>Quản lý chủ đề theo dõi</h4>
                  </div>
                </Col>
              </Row>
              {this.props.alertFoldersLoading && (
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
              {!this.props.alertFoldersLoading && (
                <Row>
                  <Col lg="8" md="6" sm="12" xs="12">
                    <div className="search-box chat-search-box col-lg-12 pb-4 pl-0 pr-0">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Tìm kiếm..."
                          onKeyDown={this.onSearchAlert}
                        />
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                  </Col>
                  <Col lg="4" md="6" sm="6" xs="12">
                    {!this.state.addFolder ? (
                      <div
                        className="search-box chat-search-box col-lg-12 pb-4 pl-0 pr-0"
                        style={{ borderRadius: "0.25rem" }}
                      >
                        <div
                          className="position-relative"
                          style={{ backgroundColor: "#ffffff" }}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Thêm nhóm chủ đề"
                            style={{
                              backgroundColor: "#ffffff",
                              borderRadius: "0.25rem",
                            }}
                            onFocus={() =>
                              this.setState({
                                addFolder: true,
                              })
                            }
                          />
                          <i className="bx bx-plus search-icon"></i>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="form-control d-flex align-items-center mb-4"
                        style={{ backgroundColor: "#EEEEEE" }}
                      >
                        <div className="align-items-baseline d-flex w-100">
                          <input
                            type="text"
                            className="mr-1 form-control-sm form-control"
                            autoFocus
                            aria-invalid="false"
                            value={this.state.newFolder}
                            onChange={(e) =>
                              this.setState({ newFolder: e.target.value })
                            }
                          />
                          <button
                            onClick={() => {
                              this.createFolder(this.state.newFolder);
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
                                addFolder: false,
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
                  </Col>
                </Row>
              )}

              <Row>
                {/* Import Cards */}
                {this.props.alertFolders && !this.props.alertFoldersLoading && (
                  <CardFolder
                    folders={
                      !this.state.searchAlert
                        ? this.props.alertFolders
                        : this.state.searchAlert
                    }
                    deleteFolder={this.delFolder}
                    deleteAlert={this.deleteAlert}
                    editFolder={this.editFolder}
                    getShareAlertLink={this.getShareAlertLink}
                    export={this.exportAlert}
                    getShareAlertLinks ={this.getShareAlertLinks }
                  />
                )}
                {/* {this.props.alertFolders && this.state.searchAlert !== []  && 
                 <CardFolder
                  folders={this.state.searchAlert}
                   deleteFolder={this.delFolder}
                   deleteAlert={this.deleteAlert}
               />
              } */}

              </Row>
            </Container>
          </div>
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alertFolders: state.AlertFolders.folders,
    alertFoldersLoading: state.AlertFolders.loading,
    login: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertFoldersRequest: (key) => {
      dispatch({
        type: "ALERT_FOLDERS_REQUEST",
        payload: key,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertManagement);
