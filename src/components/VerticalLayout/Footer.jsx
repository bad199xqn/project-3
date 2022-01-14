import React from "react";
import { Row, Col } from "reactstrap";
import logoVnalert from "../../assets/images/Logo-vnalert-2.svg";
import appstoreLage from "../../assets/images/AppStore.svg";
import CHPlayLage from "../../assets/images/CHPlay.svg";

const Footer = () => {
  return (
    <React.Fragment>
      <footer
        className="footer"
      >
        <div className="container-fluid">
          <Row className="pt-100 mb-20">
            {/* <Col sm={6}>{new Date().getFullYear()} © VnAlert</Col>
            <Col sm={6}>
              <div className="text-sm-right d-none d-sm-block">
                AIV Group
              </div>
            </Col> */}
            <Col sm={6} md={3}>
              <div className="mb-4">
                <span className="logo-sm">
                  <img loading="lazy" src={logoVnalert} alt="" height="40" />
                </span>

              </div>
              <p>
                Cách mạng hoá thói quen theo dõi thông tin trong doanh nghiệp và tổ chức
              </p>
            </Col>
            <Col sm={6} md={3}>
              <h5>
                VnAlert
              </h5>
              <div>
                <ul className="foo-links mt-3">
                  <li><a href="https://vnalert.vn/#app_Features" target="_blank">Tính năng</a></li>
                  <li><a href="https://vnalert.vn/hdsd" target="_blank">Hướng dẫn sử dụng</a></li>
                  <li><a href="https://vnalert.vn/blog" target="_blank">Tài liệu và tin tức</a></li>
                </ul>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <h5>
                Tài liệu
              </h5>
              <div>
                <ul className="foo-links mt-3">
                  <li><a href="https://vnalert.vn/hdsd/#faqs-1" target="_blank">Câu hỏi thường gặp</a></li>
                  <li><a href="https://vnalert.vn/vnalert-chinh-sach-quyen-rieng-tu/" target="_blank">Chính sách bảo mật</a></li>
                  <li><a href="https://vnalert.vn/terms-of-use/" target="_blank">Điều khoản sử dụng</a></li>
                </ul>
              </div>
            </Col>
            <Col sm={6} md={3}>

              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <ul className="foo-links">
                    <li className="d-flex align-content-center"><i className="bx bxl-twitter font-size-20 mr-1"></i><a href="https://twitter.com/vnalert" target="_blank">Twitter</a></li>
                    <li className="d-flex align-content-center"><i className="bx bxl-facebook-square font-size-20 mr-1"></i><a href="https://www.facebook.com/vnalert/" target="_blank">Facebook</a></li>
                    <li className="d-flex align-content-center"> <i className="bx bxl-instagram font-size-20 mr-1"></i><a href="https://www.instagram.com/vnalert/" target="_blank">Instagram</a></li>
                    <li className="d-flex align-content-center"><i className="bx bxl-linkedin-square font-size-20 mr-1"></i><a href="https://www.linkedin.com/showcase/vnalert/" target="_blank">Linkedin</a></li>
                  </ul>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <div className="mb-3">
                    <a href="https://apps.apple.com/app/apple-store/id1503128712?pt=120373951&amp;ct=stockmarket&amp;mt=8" target="_blank" className="store">
                      <img className="appstore-original lazyloaded" src={appstoreLage} style={{height:32}} alt="appstore-logo" data-ll-status="loaded" />
                    </a>
                  </div>
                  <div className="mb-3">
                    <a href="https://play.google.com/store/apps/details?id=com.vnalert" target="_blank" className="store">
                      <img className="googleplay-original lazyloaded" src={CHPlayLage} style={{height:32}} alt="googleplay-logo" data-ll-status="loaded" />

                    </a>
                  </div>
                </div>

              </div>
            </Col>
          </Row>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
