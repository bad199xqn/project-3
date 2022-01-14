import React from "react";
import { Row, Col } from "reactstrap";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            {new Date().getFullYear()} © Skote.
                        </Col>
                        <Col md={6}>
                            <div className="text-sm-right d-none d-sm-block">
                                Design & Develop by Themesbrand
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
