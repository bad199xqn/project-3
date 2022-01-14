import React, { Component } from "react";
import { Row, Col, CardBody, Card, Alert } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import vnalert from "../../assets/images/vnalert.svg";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorAlert: false,
      registerInfo: {
        email: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
        referral_code: ""
      }
    };

    // handleValidSubmit
    // this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit = (event, loginInfo) => {
    this.setState({
      registerInfo: {
        email: loginInfo.email,
        password1: loginInfo.password,
        password2: loginInfo.password,
        first_name: loginInfo.firstName,
        last_name: loginInfo.lastName,
        referral_code: loginInfo.code
      }
    }, () =>     this.props.registerRequest({
      loginInfo: this.state.registerInfo,
      history: this.props.history,
    }) )

  }

    componentDidMount()
    {

    }

  render() {
    const errorAlert =
    this.props.register.error !== null && this.state.errorAlert ? (
      <Alert
        color="danger"
        className="mb-2"
        isOpen={this.state.errorAlert}
        toggle={() => this.setState({ errorAlert: !this.state.errorAlert })}
      >
        {`Email đã được sử dụng`}
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
                          <h5 className="text-primary">Đăng ký</h5>
                          <p>Nhập đầy đủ thông tin để đăng ký</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
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
                        {errorAlert}

                            <Row>
                              <Col xs="8">
                              <div className="form-group">
                          <AvField
                            name="firstName"
                            label="Họ và đệm*"
                            className="form-control"
                            placeholder="Họ và đệm"
                            type="text"
                            validate={{
                              required: {value: true, errorMessage: 'Điền họ và tên đệm'},
                            }}
                          />
                        </div>


                              </Col>
                              <Col xs="4">
                              <div className="form-group">
                          <AvField
                            name="lastName"
                            label="Tên*"
                            type="text"

                            placeholder="Tên"
                            validate={{
                              required: {value: true, errorMessage: 'Điền tên'},
                            }}
                          />
                        </div>
                              </Col>
                            </Row>
                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Tài khoản*"
                            type="email"
   
                            placeholder="Nhập email"
                            validate={{
                              required: {value: true, errorMessage: 'Điền email'},
                              email: {value: true, errorMessage: 'Điền email'},
 
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Mật khẩu*"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            validate={{
                              required: {value: true, errorMessage: 'Điền mật khẩu'},
                              pattern: {value: '^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9#@$^*_-]+)$', errorMessage: 'Mật khẩu cần sử dụng 8 ký tự trở lên có kết hợp chữ in hoa và chữ số. Có thể chứa các ký tự #@$^*_-'},
                              minLength: {value: 8, errorMessage: 'Mật khẩu cần sử dụng 8 ký tự trở lên có kết hợp chữ in hoa và chữ số'},
                              maxLength: {value: 50, errorMessage: 'Mật khẩu cần sử dụng 50 ký tự trở xuống có kết hợp chữ in hoa và chữ số'}
                            }}
                          />
                        </div>

                        <div className="form-group mt-2">
                          <AvField
                            name="code"

                            type="text"

                            placeholder="Nhập mã giới thiệu (Nếu có)"
                          />
                        </div>

                        {this.props.register.loading ? (
                          <div className="mt-3">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light disabled"
                              type="submit"
                            >
                              Đăng ký
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
                              Đăng Ký
                            </button>
                          </div>
                        )}

                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            Bằng cách nhấp vào Đăng ký, bạn đồng ý với{" "}
                          </p>
                          <p>
                          <a href="https://vnalert.vn/terms-of-use/" target="_blank" className="text-primary">
                              Điều khoản sử dụng{" "}
                            </a>

                            và                           <a href="https://vnalert.vn/vnalert-chinh-sach-quyen-rieng-tu/" target="_blank" className="text-primary">
                              Chính sách dữ liệu
                            </a>
                          </p>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Bạn đã có tài khoản ?{" "}
                    <Link
                      to="/login"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Đăng nhập
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} VnAlert
                  </p>
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
    register: state.Register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (loginInfo) => {
      dispatch({
        type: "REGISTER_REQUEST",
        payload: loginInfo,
      });
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Register));
