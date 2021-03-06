import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

//Import Images
import error from "../../assets/images/error-img.png";

class DashboardCrashPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="account-pages my-5 pt-5">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="text-center mb-5">
                                    <h1 className="display-2 font-weight-medium">5<i className="bx bx-buoy bx-spin text-primary display-3"></i>0</h1>
                                    <h4 className="text-uppercase">Xin lỗi, máy chủ đang bảo trì</h4>
                                    <div className="mt-5 text-center">
                                        <a className="btn btn-primary waves-effect waves-light" href="https://www.facebook.com/vnalert/" target="_blank">Liên hệ với chúng tôi</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md="8" xl="6">
                                <div>
                                    <img src={error} alt="" className="img-fluid" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default DashboardCrashPage;