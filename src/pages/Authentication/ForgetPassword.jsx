
import React, { Component } from "react";
import { Row, Col, Alert, Card, CardBody } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import vnalert from "../../assets/images/vnalert.svg";

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.setState({
      loading: true,
    });
    this.props.userForgetPassword(values, this.props.history);
  }

  render() {
    if(this.props.forgetError){
      this.setState({
        loading: false
      })
    }
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark"><i className="fas fa-home h2"></i></Link>
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
                          <h5 className="text-primary">Thay đổi mật khẩu</h5>
                          <p>Hãy nhập email của bạn.</p>
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
                    <div className="px-2">

                      {this.props.forgetError && this.props.forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {this.props.forgetError}
                        </Alert>
                      ) : null}
                      {this.props.forgetSuccessMsg ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {this.props.forgetSuccessMsg}
                        </Alert>
                      ) : null}

                      <AvForm
                        className="form-horizontal mt-2"
                        onValidSubmit={this.handleValidSubmit}
                      >

                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>
                        <Row className="form-group mt-5">
                          <Col className="text-right">
                            <Link
                              to={'/login'}
                              className="btn btn-light w-100 w-md waves-effect waves-light"
                            >
                              Hủy
                              </Link>
                          </Col>
                          <Col className="text-right">
                            <button
                              className="btn btn-primary w-100 w-md waves-effect waves-light"
                              type="submit"
                              disabled={this.state.loading}
                            >
                              Tiếp tục
                              </button>
                          </Col>
                        </Row>
                      </AvForm>
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

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  return { forgetError, forgetSuccessMsg };
};

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
);
