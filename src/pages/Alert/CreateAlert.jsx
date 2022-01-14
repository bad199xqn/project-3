import React, { Component } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  CardSubtitle,
  Alert,
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  provinceData,
  notification_choices,
  notification_daytime,
  notification_duration,
  weekday_choices,
} from "./scheduler-choices";
import axios from "axios";

import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import loader from "../../assets/images/vnalert.svg";

import "./alert.scss";

import title from "../../assets/images/title-icon.svg";
import MXH from "../../assets/images/MXH.svg";
import News from "../../assets/images/News.svg";
import telegram from "../../assets/images/telegram.svg";
import Viber from "../../assets/images/Viber.svg";
import Youtube from "../../assets/images/Youtube.svg";
import Zalo from "../../assets/images/Zalo.svg";
import Blog from "../../assets/images/Blog.svg";
import Email from "../../assets/images/Email.svg";
import { channel } from "@redux-saga/core";
import ConnectRequirementModal from "../../components/CommonForBoth/ConnectRequirementModal";
import { api_v1 } from "../../services/api";
import './alert.scss'
class AlertCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      disabledSubmit: false,
      case_insensitive: true,
      updateAlert: null,
      notiType: { label: "Không gửi chủ đề", value: 0 },
      weekday: [{ label: "Hàng ngày", value: 0 }],
      daytime: { label: "07:00", value: "07:00:00" },
      notiDuration: { label: "Sau mỗi 6 giờ", value: "06:00:00" },
      createAlertData: {
        name: "",
        parent_folder: "",
        case_insensitive: false,
        keyword_contain: "",
        keyword_and: "",
        keyword_not: "",
        source_filter: [0],
        topic_filter: [0],
        range_filter: [0],
        sentimentality_filter: [0],
        economy_filter: [0],
      },
      createAlertsScheduler: {
        alert: 76,
        notification_type: [1],
        notification_weekday: [1],
        notification_duration: "20:10:00",
        notification_channel: [1, 2],
      },
      province: { label: "Tất cả", value: 0 },
      rangeChoices: {
        title: { state: true, value: 1 },
        des: { state: true, value: 2 },
        content: { state: true, value: 3 },
      },
      sourceChoices: {
        news: { state: true, value: 1 },
        blog: { state: true, value: 2 },
        facebook: { state: true, value: 3 },
        youtube: { state: true, value: 4 },
      },
      topicChoices: {
        economy: { state: true, value: 1 },
        politic: { state: true, value: 2 },
        lifestyle: { state: true, value: 3 },
        sport: { state: true, value: 4 },
        entertainment: { state: true, value: 5 },
        technology: { state: true, value: 6 },
      },
      sentimentalityChoices: {
        pos: { state: true, value: 1 },
        neg: { state: true, value: 2 },
        neu: { state: true, value: 3 },
        unclassified: { state: true, value: 4 },
      },
      notificationChannelChoices: {
        email: { state: false, value: 2 },
        viber: { state: false, value: 5 },
        telegram: { state: false, value: 6 },
        zalo: { state: false, value: 4 }
      },
      folder: { label: "Chọn nhóm chủ đề", value: null },
      alert: {
        isOpen: false,
        color: "success",
        text: "Theo dõi thành công",
      },
      connectModal: false,
      connectName: "",
      screenWidth: window.innerWidth
    };

    this.handleSelectGroup = this.handleSelectGroup.bind(this);
  }

  closeConnectModal = () => {
    this.setState({
      connectModal: false,
      connectName: "",
    });
  };

  getWeekdayArr = (weekdayState) => {
// console.log(weekdayState)
  const arr = weekdayState.map(day => day.value)
   return arr;
  }

  getEditAlertDetails = (pk, folder_name) => {
    const config = {
      method: "get",
      url: `${api_v1}/alerts/${pk}?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        // console.log(response.data);
        const alert = response.data;
        this.setState({
          folder: { label: folder_name, value: alert.parent_folder },
          createAlertData: {
            ...this.state.createAlertData,
            name: alert.name,
            parent_folder: alert.parent_folder + "",
            case_insensitive: alert.case_insensitive,
            keyword_contain: alert.keyword_contain + "",
            keyword_and: alert.keyword_and + "",
            keyword_not: alert.keyword_not + "",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createAlertsScheduler = (
    pk,
    type,
    weekday,
    daytime,
    duration,
    notiChannel,
    schedulers_pk
  ) => {
    var data = JSON.stringify({
      alert: pk,
      notification_type: [type],
      notification_weekday: weekday,
      notification_duration: type === 2 ? daytime : duration,
      notification_channel: notiChannel,
    });

    var config = {
      method: schedulers_pk ? "patch" : "post",
      url: schedulers_pk
        ? `${api_v1}/schedulers/${schedulers_pk}/?format=json`
        : `${api_v1}/schedulers/?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          this.props.history.push("/alert-management");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
        this.alert("error", "Tạo tần suất nhận chủ đề thất bại");
        setTimeout(() => {
          this.props.history.push("/alert-management");
        }, 3500);
      });
  };

  createAlert = (createAlertData) => {
    // this.setState({
    //   isLoading: true,
    // });
    const data = JSON.stringify(createAlertData);
    var config = {
      method: this.state.updateAlert ? "patch" : "post",
      url: this.state.updateAlert
        ? `${api_v1}/alerts/${this.state.updateAlert}/?format=json`
        : `${api_v1}/alerts/?format=json`,
      headers: {
        Authorization: `Token ${this.props.login.userKey.key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.data.schedulers[0]) {
          this.alert("success", "Sửa chủ đề thành công");
          this.createAlertsScheduler(
            response.data.pk,
            this.state.notiType.value,
            this.getWeekdayArr(this.state.weekday),
            this.state.daytime.value,
            this.state.notiDuration.value,
            this.handleChanelFilter(this.state.notificationChannelChoices),
            response.data.schedulers[0].pk
          );
        }
        if (!response.data.schedulers[0]) {
          this.alert("success", "Theo dõi chủ đề thành công");
          this.createAlertsScheduler(
            response.data.pk,
            this.state.notiType.value,
            this.getWeekdayArr(this.state.weekday),
            this.state.daytime.value,
            this.state.notiDuration.value,
            this.handleChanelFilter(this.state.notificationChannelChoices)
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
        this.alert("error", "Có lỗi xảy ra");
      });
  };

  handleRangeFilter = (rangeChoices) => {
    let range_filter = [];
    Object.entries(rangeChoices).map(([key, value]) => {
      if (value.state) {
        range_filter = [...range_filter, value.value];
      }
    });
    return range_filter.length === 3 ? [0] : range_filter;
  };

  handleSourceFilter = (sourceChoices) => {
    let source_filter = [];
    Object.entries(sourceChoices).map(([key, value]) => {
      if (value.state) {
        source_filter = [...source_filter, value.value];
      }
    });
    return source_filter.length === 4 ? [0] : source_filter;
  };

  handleChanelFilter = (notificationChannelChoices) => {
    let noti_chanel = [1];
    Object.entries(notificationChannelChoices).map(([key, value]) => {
      if (value.state) {
        noti_chanel = [...noti_chanel, value.value];
      }
    });
    return noti_chanel;
  };

  handleTopicFilter = (topicChoices) => {
    let topic_filter = [];
    Object.entries(topicChoices).map(([key, value]) => {
      if (value.state) {
        topic_filter = [...topic_filter, value.value];
      }
    });
    return topic_filter.length === 6 ? [0] : topic_filter;
  };

  handleSentimentalityFilter = (sentimentalityChoices) => {
    let sentimentality_filter = [];
    Object.entries(sentimentalityChoices).map(([key, value]) => {
      if (value.state) {
        sentimentality_filter = [...sentimentality_filter, value.value];
      }
    });
    return sentimentality_filter.length === 4 ? [0] : sentimentality_filter;
  };

  getAlertFolders = (alertFolders) => {
    let folders = [];
    alertFolders.map((folder) => {
      if (folder.name === "root_folder") {
        folders = [...folders, { label: "Chưa đặt tên", value: folder.pk }];
      } else {
        folders = [...folders, { label: folder.name, value: folder.pk }];
      }
    });
    return [{ options: folders }];
  };

  alert = (state, errorText) => {
    if (state === "success") {
      this.setState({
        alert: {
          ...this.state.alert,
          color: "success",
          isOpen: true,
          text: errorText,
        },
      });
    }
    if (state === "error") {
      this.setState({
        disabledSubmit: false,
        alert: {
          color: "danger",
          isOpen: true,
          text: errorText,
        },
      });
    }
  };

  submitValidation = (submitData) => {
    if (
      submitData.name === "" ||
      submitData.parent_folder === null ||
      submitData.keyword_contain === ""
    )
      return false;
    else return true;
  };

  handleSubmit = () => {
    this.setState(
      {
        disabledSubmit: true,
        createAlertData: {
          ...this.state.createAlertData,
          case_insensitive: this.state.case_insensitive,
          parent_folder: this.state.folder.value,
          source_filter: this.handleSourceFilter(this.state.sourceChoices),
          range_filter: this.handleRangeFilter(this.state.rangeChoices),
          topic_filter: this.handleTopicFilter(this.state.topicChoices),
          sentimentality_filter: this.handleSentimentalityFilter(
            this.state.sentimentalityChoices
          ),
        },
      },
      () => {
        const data = this.state.createAlertData;
        if (this.submitValidation(data)) {
          this.createAlert(this.state.createAlertData);
        } else {
          this.alert(
            "error",
            "Cần nhập Tên chủ đề, Nhóm chủ đề, Quản lý từ khóa"
          );
        }
      }
    );
  };

  handleSelectGroup = (province) => {
    this.setState({ province });
  };

  handleSelectFolder = (folder) => {
    this.setState({ folder });
  };

  handleNameInput = (e) => {
    this.setState({
      createAlertData: {
        ...this.state.createAlertData,
        name: e.target.value,
      },
    });
  };

  handleKeywordContainInput = (e) => {
    this.setState({
      createAlertData: {
        ...this.state.createAlertData,
        keyword_contain: e.target.value,
      },
    });
  };

  handleKeywordAndInput = (e) => {
    this.setState({
      createAlertData: {
        ...this.state.createAlertData,
        keyword_and: e.target.value,
      },
    });
  };

  handleKeywordNotInput = (e) => {
    this.setState({
      createAlertData: {
        ...this.state.createAlertData,
        keyword_not: e.target.value,
      },
    });
  };

  // update state screenSize
  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  componentWillMount() {
    window.removeEventListener("resize", this.updateWindowDimensions());
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const alert = params.get("alert");
    const folder_name = params.get("folder")
    // this.setState({
    //   folder: { label: "Chưa đặt tên", value: root_folder }
    // })
    if (alert) {
      this.setState({ updateAlert: alert});
      this.getEditAlertDetails(alert, folder_name);
    }
    if (this.props.alertFolders === null) {
      this.props.alertFoldersRequest(this.props.login.userKey.key);
    }

    if (this.props.location.state !== undefined) {
      this.setState({
        createAlertData: {
          ...this.state.createAlertData,
          name: this.props.location.state.keyword,
          keyword_contain: this.props.location.state.keyword,
        },
      });
    }
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    const folders =
      this.props.alertFolders !== null
        ? [...this.getAlertFolders(this.props.alertFolders)]
        : [];
    const { folder } = this.state;
    const { province } = this.state;

    const scheduler = (type) => {
      if (type.value === 3) {
        return (
          <div className="mt-2">
            <Select
              value={this.state.notiDuration}
              onChange={(notiDuration) =>
                this.setState({ notiDuration: notiDuration })
              }
              options={notification_duration}
              classNamePrefix="select2-selection"
            />
          </div>
        );
      }

      if (type.value === 2) {
        return (
          <div className="mt-2">
            <Row>
              <Col lg={6}>
                <Select
                  value={this.state.weekday}
                  isMulti={true}
                  onChange={(weekday) => this.setState({ weekday: weekday })}
                  options={weekday_choices}
                  classNamePrefix="select2-selection"
                  placeholder="Thứ trong tuần"
                />
              </Col>

              <Col lg={6}>
                <Select
                  value={this.state.daytime}
                  onChange={(daytime) => this.setState({ daytime: daytime })}
                  options={notification_daytime}
                  classNamePrefix="select2-selection"
                />
              </Col>
            </Row>
          </div>
        );
      }
    };
    return (
      
      <React.Fragment>
        <div className="page-content">
          <ConnectRequirementModal
            isOpen={this.state.connectModal}
            closeModal={this.closeConnectModal}
            name={this.state.connectName}
          />
          <Container fluid>
            <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  {this.state.updateAlert ? (
                    <h4>Chỉnh sửa theo dõi chủ đề</h4>
                  ) : (
                    <h4>Theo dõi chủ đề</h4>
                  )}
                </div>
              </Col>
            </Row>
            <div className="alert-container">
              <Alert
                className="dismissing-alert"
                color={this.state.alert.color}
                isOpen={this.state.alert.isOpen}
                toggle={() =>
                  this.setState({
                    alert: {
                      ...this.state.alert,
                      isOpen: !this.state.alert.isOpen,
                    },
                  })
                }
              >
                {this.state.alert.text}
              </Alert>
            </div>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TabPane tabId="1">
                    <div>
                      <CardSubtitle className="mb-3"></CardSubtitle>
                      <Form
                        onSubmit={(event) => {
                          event.preventDefault();
                          this.handleSubmit();
                        }}
                      >
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Tên chủ đề*
                          </Label>
                          <Col md="9">
                            <Input
                              value={this.state.createAlertData.name}
                              type="text"
                              className="form-control"
                              // id="billing-name"
                              placeholder="Nhập tên chủ đề"
                              onChange={this.handleNameInput}
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="select2-container mb-4" row>
                          <Label md="3" className="col-form-label">
                            Nhóm chủ đề*
                          </Label>
                          <Col md="9">
                            <Select
                              // defaultValue={folders.filter(folder => folder.value == this.state.createAlertData.parent_folder)}
                              // defaultValue={{ label: "Chọn nhóm cảnh báoô", value: null }}
                              value={folder}
                              onChange={this.handleSelectFolder}
                              options={folders}
                              classNamePrefix="select2-selection"
                              placeholder="Chọn nhóm chủ đề"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Quản lý từ khóa*
                          </Label>
                          <Col md="9">
                            <Input
                              value={this.state.createAlertData.keyword_contain}
                              type="text"
                              className="form-control"
                              // id="billing-name"
                              placeholder={`Từ khoá cần chứa, ngăn cách bởi dấu ";". VD: covid-19; Hà Nội`}
                              onChange={this.handleKeywordContainInput}
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Cấu hình từ khóa nâng cao
                          </Label>
                          <Col md="9">
                            <Input
                              value={this.state.createAlertData.keyword_and}
                              type="text"
                              className="form-control"
                              // id="billing-name"
                              placeholder="Từ khoá bao gồm"
                              onChange={this.handleKeywordAndInput}
                            />
                            <Input
                              value={this.state.createAlertData.keyword_not}
                              className="form-control mt-4"
                              // id="billing-name"
                              placeholder="Từ khoá loại trừ"
                              onChange={this.handleKeywordNotInput}
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Phân biệt chữ hoa/thường
                          </Label>
                          <Col md="9" className="d-flex align-items-center">
                            <div
                              className="custom-control custom-switch"
                              dir="ltr"
                            >
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitch1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customSwitch1"
                                onClick={(e) => {
                                  this.setState({
                                    case_insensitive:
                                      !this.state.case_insensitive,
                                  });
                                }}
                              ></label>
                            </div>
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Tính chất thông tin
                          </Label>
                          <Col md="9" className="col-form-label">
                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                style={{ borderColor: "#fff" }}
                                // id="CustomCheck1"
                                onChange={() => false}
                                checked={
                                  this.state.sentimentalityChoices.pos.state
                                }
                              />
                              <label
                                className="custom-control-label"
                                onClick={() => {
                                  this.setState({
                                    sentimentalityChoices: {
                                      ...this.state.sentimentalityChoices,
                                      pos: {
                                        state:
                                          !this.state.sentimentalityChoices.pos,
                                        value: 1,
                                      },
                                    },
                                  });
                                }}
                              >
                                Tích cực
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                style={{ borderColor: "#fff" }}
                                // id="CustomCheck1"
                                onChange={() => false}
                                checked={
                                  this.state.sentimentalityChoices.neg.state
                                }
                              />
                              <label
                                className="custom-control-label"
                                onClick={() => {
                                  this.setState({
                                    sentimentalityChoices: {
                                      ...this.state.sentimentalityChoices,
                                      neg: {
                                        state:
                                          !this.state.sentimentalityChoices.neg,
                                        value: 2,
                                      },
                                    },
                                  });
                                }}
                              >
                                Tiêu cực
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox mb-0">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                style={{ borderColor: "#fff" }}
                                // id="CustomCheck1"
                                onChange={() => false}
                                checked={
                                  this.state.sentimentalityChoices.neu.state
                                }
                              />
                              <label
                                className="custom-control-label"
                                onClick={() => {
                                  this.setState({
                                    sentimentalityChoices: {
                                      ...this.state.sentimentalityChoices,
                                      neu: {
                                        state:
                                          !this.state.sentimentalityChoices.neu,
                                        value: 3,
                                      },
                                      unclassified: {
                                        state:
                                          !this.state.sentimentalityChoices
                                            .unclassified,
                                        value: 4,
                                      },
                                    },
                                  });
                                }}
                              >
                                Trung tính
                              </label>
                            </div>
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Phạm vi tìm kiếm
                          </Label>
                          <Col md="9" className="d-flex align-items-center">
                            <div className="row button-items d-flex justify-content-start">
                            {/* <Row> // thêm class để khi co về màn hình mobile không bị vỡ nút */}
                              <button
                                type="button"
                                className="col-xs-6 btn waves-effect waves-light d-flex align-items-center mr-1"
                                style={{
                                  backgroundColor: "#fff",
                                  borderColor: "#D4DDFF",
                                }}
                                onClick={() =>
                                  this.setState({
                                    rangeChoices: {
                                      ...this.state.rangeChoices,
                                      title: {
                                        state:
                                          !this.state.rangeChoices.title.state,
                                        value: 1,
                                      },
                                    },
                                  })
                                }
                              >
                                <img
                                  src={title}
                                  alt=""
                                  height="16"
                                  className="mr-2"
                                />
                                Tiêu đề{"  "}{" "}
                                <i
                                  className="bx bx-check font-size-16 align-middle "
                                  style={{
                                    color: this.state.rangeChoices.title.state
                                      ? "#3E64FF"
                                      : "#fff",
                                  }}
                                ></i>
                              </button>
                              <button
                                type="button"
                                className="col-xs-6 btn waves-effect waves-light d-flex align-items-center mr-1"
                                style={{
                                  backgroundColor: "#fff",
                                  borderColor: "#D4DDFF",
                                }}
                                onClick={() =>
                                  this.setState({
                                    rangeChoices: {
                                      ...this.state.rangeChoices,
                                      des: {
                                        state:
                                          !this.state.rangeChoices.des.state,
                                        value: 2,
                                      },
                                    },
                                  })
                                }
                              >
                                <img
                                  src={title}
                                  alt=""
                                  height="16"
                                  className="mr-2"
                                />
                                Mô tả{"  "}{" "}
                                <i
                                  className="bx bx-check font-size-16 align-middle "
                                  style={{
                                    color: this.state.rangeChoices.des.state
                                      ? "#3E64FF"
                                      : "#fff",
                                  }}
                                ></i>
                              </button>
                              <button
                                type="button"
                                className="col-xs-6 btn waves-effect waves-light d-flex align-items-center"
                                style={{
                                  backgroundColor: "#fff",
                                  borderColor: "#D4DDFF",
                                }}
                                onClick={() =>
                                  this.setState({
                                    rangeChoices: {
                                      ...this.state.rangeChoices,
                                      content: {
                                        state:
                                          !this.state.rangeChoices.content
                                            .state,
                                        value: 3,
                                      },
                                    },
                                  })
                                }
                              >
                                <img
                                  src={title}
                                  alt=""
                                  height="16"
                                  className="mr-2"
                                />
                                Nội dung{"  "}{" "}
                                <i
                                  className="bx bx-check font-size-16 align-middle "
                                  style={{
                                    color: this.state.rangeChoices.content.state
                                      ? "#3E64FF"
                                      : "#fff",
                                  }}
                                ></i>
                              </button>
                            {/* </Row> */}
                            </div>
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Nguồn tin
                          </Label>
                          <Col
                            md="9"
                            className={this.state.screenWidth >= 411 ? "btn-alert d-flex align-items-center pl-0" : "btn-alert align-items-center pl-0"}
                          >
                            <Col md="6" className="grid-style-resource">
                              <div className=" button-items mb-0 ">
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 140, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      sourceChoices: {
                                        ...this.state.sourceChoices,
                                        news: {
                                          state:
                                            !this.state.sourceChoices.news
                                              .state,
                                          value: 1,
                                        },
                                      },
                                    });
                                  }}
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
                                  {this.state.sourceChoices.news.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#FFF" }}
                                    ></i>
                                  )}
                                </button>
                            
                              </div>
                              <div>
                              <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 140, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      sourceChoices: {
                                        ...this.state.sourceChoices,
                                        blog: {
                                          state:
                                            !this.state.sourceChoices.blog
                                              .state,
                                          value: 2,
                                        },
                                      },
                                    });
                                  }}
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
                                  {this.state.sourceChoices.blog.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                           
                              <div className=" button-items mb-0">
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 140, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      sourceChoices: {
                                        ...this.state.sourceChoices,
                                        facebook: {
                                          state:
                                            !this.state.sourceChoices.facebook
                                              .state,
                                          value: 3,
                                        },
                                      },
                                    });
                                  }}
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
                                  {this.state.sourceChoices.facebook.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                               
                              </div>
                              <div>
                              <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 140, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      sourceChoices: {
                                        ...this.state.sourceChoices,
                                        youtube: {
                                          state:
                                            !this.state.sourceChoices.youtube
                                              .state,
                                          value: 4,
                                        },
                                      },
                                    });
                                  }}
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
                                  {this.state.sourceChoices.youtube.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                            </Col>
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="billing-name"
                            md="3"
                            className="col-form-label"
                          >
                            Chủ đề
                          </Label>
                          <Col
                            md="9"
                            className={this.state.screenWidth >= 375 ? "btn-alert d-flex align-items-center pl-0" : "btn-alert align-items-center pl-0"}
                            // className="btn-alert d-flex align-items-center pl-0"
                          >
                            <Col md="6" className="grid-style-theme">
                              <div className=" button-items mb-0">
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 120, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      topicChoices: {
                                        ...this.state.topicChoices,
                                        economy: {
                                          state:
                                            !this.state.topicChoices.economy
                                              .state,
                                          value: 1,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  Kinh tế{" "}
                                  {this.state.topicChoices.economy.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                         
                              </div>
                              <div>
                              <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 120, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      topicChoices: {
                                        ...this.state.topicChoices,
                                        politic: {
                                          state:
                                            !this.state.topicChoices.politic
                                              .state,
                                          value: 2,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  Chính trị{" "}
                                  {this.state.topicChoices.politic.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                              <div>
                                  
                              <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 120, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      topicChoices: {
                                        ...this.state.topicChoices,
                                        lifestyle: {
                                          state:
                                            !this.state.topicChoices.lifestyle
                                              .state,
                                          value: 3,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  Đời sống{"  "}{" "}
                                  {this.state.topicChoices.lifestyle.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                           
                           
                              <div className=" button-items mb-0">
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 120, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      topicChoices: {
                                        ...this.state.topicChoices,
                                        entertainment: {
                                          state:
                                            !this.state.topicChoices
                                              .entertainment.state,
                                          value: 5,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  Giải trí{" "}
                                  {this.state.topicChoices.entertainment
                                    .state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                           
                              </div>
                              <div>
                              <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 120, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      topicChoices: {
                                        ...this.state.topicChoices,
                                        technology: {
                                          state:
                                            !this.state.topicChoices.technology
                                              .state,
                                          value: 6,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  Công nghệ{" "}
                                  {this.state.topicChoices.technology.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                              <div>
                                
                              <button
                                  type="button"
                                  className="btn waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                                  style={ this.state.screenWidth < 456 ? 
                                    {width: 120, backgroundColor: "#fff", borderColor: "#D4DDFF",} : 
                                    {width: 160, backgroundColor: "#fff", borderColor: "#D4DDFF",}}
                                  onClick={() => {
                                    this.setState({
                                      topicChoices: {
                                        ...this.state.topicChoices,
                                        sport: {
                                          state:
                                            !this.state.topicChoices.sport
                                              .state,
                                          value: 4,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  Thể thao{"  "}{" "}
                                  {this.state.topicChoices.sport.state ? (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#3E64FF" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-check font-size-16 align-middle "
                                      style={{ color: "#fff" }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                            </Col>
                          </Col>
                        </FormGroup>

                        <FormGroup className="select2-container mb-4" row>
                          <Label md="3" className="col-form-label">
                            Địa phương
                          </Label>
                          <Col md="9">
                            <Select
                              value={province}
                              onChange={this.handleSelectGroup}
                              options={provinceData}
                              classNamePrefix="select2-selection"
                              placeholder="Tất cả tỉnh thành"
                            />
                          </Col>
                        </FormGroup>

                        

                        
                        <div className="d-flex justify-content-center mt-5">
                          <input
                            disabled={this.state.disabledSubmit}
                            type="submit"
                            className="btn btn-lg btn-primary waves-effect waves-light d-flex align-items-center d-flex justify-content-between"
                            value={
                              this.state.updateAlert
                                ? "Sửa theo dõi chủ đề"
                                : "Theo dõi chủ đề"
                            }
                          ></input>
                        </div>
                      </Form>
                    </div>
                  </TabPane>
                </CardBody>
              </Card>
            </Col>
            <Modal className="modal-sm" isOpen={this.state.isLoading}>
              <div className="modal-body">
                <div style={{ height: 100 }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "calc(50% - 30px)",
                    }}
                  >
                    <span className="logo-sm loader">
                      <img src={loader} alt="" height="60" />
                    </span>
                  </div>
                </div>
                <h6>chủ đề đang được tạo, xin vui lòng đợi</h6>
              </div>
            </Modal>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.UserDetails.userDetails,
    alertFolders: state.AlertFolders.folders,
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

export default connect(mapStateToProps, mapDispatchToProps)(AlertCreate);
