import React, { Component } from "react";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, withRouter } from "react-router-dom";

import { Row, Col, CardBody, Card } from "reactstrap";
import { connect } from "react-redux";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import empty from "../../assets/images/empty.svg";

import axios from "axios";
import { alertFoldersError } from "../../store/alerts/actions";
import { api_v1 } from "../../services/api";
import ConnectViberModal from "../../components/CommonForBoth/ConnectModal/ConnectViberModal";
import ConnectTelegramModal from "../../components/CommonForBoth/ConnectModal/ConnectTelegramModal";
import ChangePasswordComponent from "./ChangePassword";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viberModal: false,
      teleModal: false,
      profileUpdate: {
        first_name: "",
        last_name: "",
        email: "",
        profile: {
          address: "",
          phone: "",
        },
      },
      first_name: this.props.userDetails ? this.props.userDetails.first_name : '',
      last_name: this.props.userDetails ? this.props.userDetails.last_name : '',
      email: this.props.userDetails ? this.props.userDetails.email : '',

      address: this.props.userDetails ? this.props.userDetails.profile.address: '',
      phone: this.props.userDetails ? this.props.userDetails.profile.phone : '',
      isChangePassword: false,
    };
  }

  delUser = (key, userPk) => {
    let data = JSON.stringify({});

    const config = {
      method: "delete",
      url: `${api_v1}/users/${userPk}/?format=json`,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        this.props.history.push("/");
      })
      .catch(function (error) {});
  };

  save = (key, userPk, profileUpdate) => {
    let data = JSON.stringify(profileUpdate);

    const config = {
      method: "patch",
      url: `${api_v1}/users/${userPk}/?format=json`,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.props.userDetailsRequest(key);
      })
      .catch(function (error) {});
  };

  static getDerivedStateFromProps(props, state) {
    const userDetails = props.userDetails;
    return {
      profile: {
        first_name: userDetails ? userDetails.first_name :'',
        last_name: userDetails ? userDetails.last_name : '',
        email: userDetails ? userDetails.email : '',
        profile: {
          address: userDetails ? userDetails.profile.address : '',
          phone: userDetails ? userDetails.profile.phone : '',
        },
      },
    };
  }

  doneViber = () => {
    this.setState({
      viberModal: false,
    });
  };

  doneTele = () => {
    this.setState({
      teleModal: false,
    });
  };

  componentDidMount() {
    this.props.userDetailsRequest(this.props.login.userKey.key);
  }

  showIsChangePassword = () => {
    this.setState({
      isChangePassword: !this.state.isChangePassword,
    });
  }

  handlePlan = (plan) => {
    if(plan === 2){
      return "Tài khoản Tiêu chuẩn"
    }else if(plan === 3){
      return "Tài khoản Cao cấp"
    }else if(plan === 4){
      return "Tài khoản Doanh nghiệp"
    }else{
      return "Người dùng mới"
    }
  }

  render() {
    // console.log(this.props.userDetails)
    return (
      <React.Fragment>
        {
          this.props.userDetails && 
          <>
          {this.state.profile && (
          <>
            <ConnectViberModal
              isOpenModal={this.state.viberModal}
              doneClick={this.doneViber}
              userKey={this.props.login.userKey.key}
            />
            <ConnectTelegramModal
              isOpenModal={this.state.teleModal}
              doneClick={this.doneTele}
              userKey={this.props.login.userKey.key}
            />
            <div className="home-btn d-none d-sm-block">
              <Link to="/" className="text-dark">
                <i className="fas fa-home h2"></i>
              </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
              <div className="container-fluid">
                <Row>
                  <Col xs="12">
                    <div className="page-title-box d-flex align-items-center justify-content-between pl-2">
                      <h4>Tài khoản</h4>
                    </div>
                  </Col>
                </Row>
                
                {this.state.isChangePassword ? <ChangePasswordComponent login={this.props.login} showIsChangePassword={this.showIsChangePassword} userDetails={this.props.userDetails} /> : 
                  <Row className="justify-content-center">
                    <Col md={8} lg={8} xl={5}>
                      <Card className="overflow-hidden">
                        <div className="bg-soft-primary">
                          <Row>
                            <Col className="col-8">
                              <div className=" p-4">
                                <h3 className="">
                                  {this.props.userDetails.last_name +
                                    " " +
                                    this.props.userDetails.first_name}
                                </h3>
                                <div className="d-flex">
                                  <p className="text-warning">
                                    {this.props.userDetails.pocket.balance +
                                      " token"}{" "}
                                  </p>
                                  <p className="mx-1">|</p>
                                  <p className="text-primary">
                                    {this.handlePlan(this.props.userDetails.pocket.plan)}{` >`}
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Col className="col-4 ">
                              <div
                                className="d-flex justify-content-end p-4"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  this.setState(
                                    {
                                      profileUpdate: {
                                        first_name: this.state.first_name,
                                        last_name: this.state.last_name,
                                        email: this.state.email,
                                        profile: {
                                          address: this.state.address,
                                          phone: this.state.phone,
                                        },
                                      },
                                    },
                                    () =>
                                      this.save(
                                        this.props.login.userKey.key,
                                        this.props.userDetails.pk,
                                        this.state.profileUpdate
                                      )
                                  )
                                }
                              >
                                <h6 className="">Lưu</h6>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <CardBody className="pt-0">
                          <div>
                            <div className="avatar-md profile-user-wid mb-4">
                              <span className="avatar-title rounded-circle bg-light">
                                <Link >
                                  <img
                                    src={empty}
                                    alt=""
                                    className="rounded-circle"
                                    height="34"
                                  />
                                </Link>
                              </span>
                            </div>
                          </div>
                          <div className="p-2">
                            <AvForm className="form-horizontal">
                              <div className="form-group d-flex flex-row mb-0">
                                <div className="col-6 pl-0 pr-1">
                                  <AvField
                                    value={this.state.last_name}
                                    name="lastName"
                                    // label="Email"
                                    className="form-control  m-0"
                                    placeholder="Họ và tên đệm"
                                    type="text"
                                    // required
                                    onChange={(e) => {
                                      this.setState({
                                        last_name: e.target.value,
                                      });
                                    }}
                                  ></AvField>
                                </div>
                                <div className="col-6 pl-1 pr-0">
                                  <AvField
                                    value={this.state.first_name}
                                    name="firstName"
                                    // label="Email"
                                    className="form-control m-0"
                                    placeholder="Tên"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        first_name: e.target.value,
                                      });
                                    }}
                                    // required
                                  ></AvField>
                                </div>
                              </div>

                              <div className="form-group">
                                <AvField
                                  value={this.state.phone}
                                  name="phoneNumber"
                                  // label="Username"
                                  type="number"
                                  // required
                                  placeholder="Số điện thoại"
                                  onChange={(e) => {
                                    this.setState({
                                      phone: e.target.value,
                                    });
                                  }}
                                ></AvField>
                              </div>
                              <div className="form-group">
                                <AvField
                                  value={this.state.email}
                                  name="email"
                                  // label="Password"
                                  type="email"
                                  // required
                                  placeholder="Email"
                                  onChange={(e) => {
                                    this.setState({
                                      email: e.target.value,
                                    });
                                  }}
                                ></AvField>
                              </div>
                              <div className="form-group">
                                <AvField
                                  value={this.state.address}
                                  name="address"
                                  // label="Password"
                                  type="text"
                                  // required
                                  placeholder="Địa chỉ"
                                  onChange={(e) => {
                                    this.setState({
                                      address: e.target.value,
                                    });
                                  }}
                                ></AvField>
                              </div>

                              <div className="text-center">
                                <p className="mb-0">
                                  <small className="text-muted">
                                    Thông tin này sẽ được sử dụng trong hóa đơn
                                    bán hàng
                                  </small>
                                </p>
                              </div>

                              <div className="mt-4">
                                {this.props.userDetails.profile.viber_verified ? (
                                  <button
                                    className="btn btn-block btn-light waves-effect waves-light align-items-center"
                                    style={{ backgroundColor: "#BEBEBE" }}
                                  >
                                    <div className="row">
                                      <div className="col-1">
                                        <i
                                          className="fab fa-viber h2 mb-0"
                                          style={{ color: "#fff" }}
                                        ></i>
                                      </div>
                                      <div className="col-11 d-flex align-items-center justify-content-center">
                                        <p
                                          style={{
                                            // color: "#495057",
                                            color: "#fff",
                                            margin: 0,
                                            fontSize: "0.8125rem",
                                            paddingRight: 38,
                                          }}
                                        >
                                          Liên kết với Viber
                                        </p>
                                      </div>
                                    </div>
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-block btn-light waves-effect waves-light align-items-center"
                                    style={{ backgroundColor: "#59267c" }}
                                    onClick={() =>
                                      this.setState({ viberModal: true })
                                    }
                                  >
                                    <div className="row">
                                      <div className="col-1">
                                        <i
                                          className="fab fa-viber h2 mb-0"
                                          style={{ color: "#fff" }}
                                        ></i>
                                      </div>
                                      <div className="col-11 d-flex align-items-center justify-content-center">
                                        <p
                                          style={{
                                            // color: "#495057",
                                            color: "#fff",
                                            margin: 0,
                                            fontSize: "0.8125rem",
                                            paddingRight: 38,
                                          }}
                                        >
                                          Liên kết với Viber
                                        </p>
                                      </div>
                                    </div>
                                  </button>
                                )}

                                {this.props.userDetails.profile
                                  .telegram_verified ? (
                                  <button
                                    className="btn btn-block btn-light waves-effect waves-light align-items-center mt-3"
                                    style={{ backgroundColor: "#BEBEBE" }}
                                  >
                                    <div className="row">
                                      <div className="col-1">
                                        <i
                                          className="fab fa-telegram h2 mb-0"
                                          style={{ color: "#fff" }}
                                        ></i>
                                      </div>
                                      <div className="col-11 d-flex align-items-center justify-content-center ">
                                        <p
                                          style={{
                                            color: "#fff",
                                            margin: 0,
                                            fontSize: "0.8125rem",
                                            paddingRight: 38,
                                          }}
                                        >
                                          Liên kết với Telegram
                                        </p>
                                      </div>
                                    </div>
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-block btn-light waves-effect waves-light align-items-center mt-3"
                                    onClick={() =>
                                      this.setState({ teleModal: true })
                                    }
                                    style={{ backgroundColor: "#ccedfe" }}
                                  >
                                    <div className="row">
                                      <div className="col-1">
                                        <i
                                          className="fab fa-telegram h2 mb-0"
                                          style={{ color: "#65cbff" }}
                                        ></i>
                                      </div>
                                      <div className="col-11 d-flex align-items-center justify-content-center ">
                                        <p
                                          style={{
                                            color: "#495057",
                                            margin: 0,
                                            fontSize: "0.8125rem",
                                            paddingRight: 38,
                                          }}
                                        >
                                          Liên kết với Telegram
                                        </p>
                                      </div>
                                    </div>
                                  </button>
                                )}
                              </div>

                              <div className="mt-4 text-center">
                                <p className="mb-0">
                                  <Link
                                    to=""
                                    className="text-danger"
                                    onClick={() =>
                                      this.delUser(
                                        this.props.login.userKey.key,
                                        this.props.userDetails.pk
                                      )
                                    }
                                  >
                                    Xóa tài khoản
                                  </Link>
                                </p>
                              </div>

                              <div className="mt-4 text-center">
                                <p className="mb-0">
                                  <Link to="#" className="text-primary" onClick={() => this.showIsChangePassword()}>
                                    Đổi mật khẩu
                                  </Link>
                                </p>
                              </div>

                              {/* <div className="mt-4">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Lưu
                          </button>
                        </div> */}
                            </AvForm>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                }
              </div>
            </div>
          </>
        )}
          </>
        }
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.UserDetails.userDetails,
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
    userDetailsRequest: (key) => {
      dispatch({
        type: "USER_DETAILS_REQUEST",
        payload: key,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserInfo));
