import React, { Component } from "react";

import { Row, Col, CardBody, Card, Alert } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";


// import images
import profile from "../../assets/images/profile-img.png";
import vnalert from "../../assets/images/vnalert.svg";
import logo from "../../assets/images/logo.svg";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorAlert: false,
      fbLogin: false,
    };

    // handleValidSubmit
    // this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit = (event, loginInfo) => {
    this.props.userLoginRequest({
      loginInfo: loginInfo,
      history: this.props.history,
    });
  }

  handleFbLogin = (response) => {
    const loginInfo = `{
      "facebook_token":"${response.accessToken}"
  }`
    this.props.userLoginRequest({
      loginInfo: loginInfo,
      history: this.props.history,
    });
  }

  handleGgLogin = (response) => {
    const loginInfo = `{
      "google_token":"${response.accessToken}"
  }`
    this.props.userLoginRequest({
      loginInfo: loginInfo,
      history: this.props.history,
    });
  }

  // redirect = () => {
  //     if (this.props.login.userKey !== undefined) {
  //         console.log(this.props.login.userKey)
  //         this.props.history.push("/bookmark")
  //     }
  // }

  componentDidMount() {
    // this.props.apiError("");
  }



  render() {
    // console.log(this.props.login.userKey);
    const errorAlert =
      this.props.login.error !== null && this.state.errorAlert ? (
        <Alert
          color="danger"
          className="mb-2"
          isOpen={this.state.errorAlert}
          toggle={() => this.setState({ errorAlert: !this.state.errorAlert })}
        >
          {`              Tài khoản hoặc mật khẩu không chính xác.\ 
              Vui lòng thử lại`}
        </Alert>
      ) : null;
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <div className="container">
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Xin chào!</h5>
                          <p>Đăng nhập để tiếp tục sử dụng VnAlert</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={vnalert}
                              alt=""
                              className="rounded-circle"
                              height="72"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.handleValidSubmit}
                      >
                        {/* {this.props.error && this.props.error ? <Alert color="danger">{this.props.error}</Alert> : null} */}

                        {errorAlert}

                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Email"
                            value=""
                            className="form-control"
                            placeholder="Email"
                            type="email"
                            validate={{
                              required: { value: true, errorMessage: 'Điền email' },
                              email: { value: true, errorMessage: 'Điền email' },
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Mật khẩu"
                            value=""
                            type="password"
                            placeholder="Mật khẩu"
                            validate={{
                              required: { value: true, errorMessage: 'Điền mật khẩu' },
                              pattern: { value: '^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9#@$^*_-]+)$', errorMessage: 'Mật khẩu cần sử dụng 8 ký tự trở lên có kết hợp chữ in hoa và chữ số. Có thể chứa các ký tự #@$^*_-' },
                              minLength: { value: 8, errorMessage: 'Mật khẩu cần sử dụng 8 ký tự trở lên có kết hợp chữ in hoa và chữ số' },
                              maxLength: { value: 50, errorMessage: 'Mật khẩu cần sử dụng 50 ký tự trở xuống có kết hợp chữ in hoa và chữ số' }
                            }}
                          />
                        </div>

                        {/* <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" htmlFor="customControlInline">Ghi nhớ tài khoản</label>
                                                </div> */}

                        {this.props.login.loading ? (
                          <div className="mt-3">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light disabled"
                              type="submit"
                            >
                              Đăng nhập
                            </button>
                          </div>
                        ) : (
                          <div className="mt-3">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light"
                              type="submit"
                              onClick={() =>
                                this.setState({ errorAlert: true })
                              }
                            >
                              Đăng nhập
                            </button>
                          </div>
                        )}

                        <div className="mt-4 mb-4 text-center">
                          <Link to="/forget-password" className="text-muted">
                            <i className="mdi mdi-lock mr-1"></i>Quên mật khẩu ?
                          </Link>
                        </div>
                      </AvForm>

                      <div className="">
                        <FacebookLogin
                          appId="276497883666442"
                          autoLoad={false}
                          fields="name,email,picture"
                          onClick={() => this.setState({ errorAlert: true, fbLogin: true })}
                          callback={this.handleFbLogin}
                          render={(renderProps) => (
                            <button className="btn btn-block btn-light waves-effect waves-light align-items-center" onClick={renderProps.onClick}>
                              <div className="row">
                                <div className="col-1">
                                  <i className="bx bxl-facebook-square h2 mb-0" style={{ color: '#6774B3' }}></i>
                                </div>
                                <div className="col-11 d-flex align-items-center justify-content-center ">
                                  <p style={{ color: '#495057', margin: 0, fontSize: '0.8125rem' }}>
                                    Đăng nhập bằng Facebook
                                  </p>
                                </div>
                              </div>

                            </button>
                          )}
                        />
                      </div>
                      <div className="mt-3 mb-2">
                        <GoogleLogin
                          clientId="130669112769-vrudvdgr8a0gf6jkos7e31br60peg1uu.apps.googleusercontent.com"
                          buttonText="Login"
                          onSuccess={this.handleGgLogin}
                          onFailure={this.handleGgLogin}
                          cookiePolicy={'single_host_origin'}
                          render={renderProps => (
                            <button className="btn btn-block btn-light waves-effect waves-light align-items-center" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                              <div className="row">
                                <div className="col-1">
                                  <i className="bx bxl-google h2 mb-0" style={{ color: '#6774B3' }}></i>
                                </div>
                                <div className="col-11 d-flex align-items-center justify-content-center ">
                                  <p style={{ color: '#495057', margin: 0, fontSize: '0.8125rem' }}>
                                    Đăng nhập bằng Google
                                  </p>
                                </div>
                              </div>
                            </button>
                          )}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Chưa có tài khoản?{" "}
                    <Link
                      to="register"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Đăng ký ngay{" "}
                    </Link>{" "}
                  </p>
                  <p>© {new Date().getFullYear()} VnAlert</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    login: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginRequest: (loginInfo) => {
      dispatch({
        type: "USER_LOGIN_REQUEST",
        payload: loginInfo,
      });
    },
  };
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Login));
