import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Pricing Cards
import CardPricing from "./card-pricing";

class PricingPlans extends Component {
    state = {
        pricings: [
            {
                id: 1, title: `Gói tiêu chuẩn`, description: "Gói tiêu chuẩn \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0", icon: "bx-walk", price: "99", duration: "tháng", link: "", call_action:"Mua ngay",
                features: [
                    { title: "1.000 bài viết huấn luyện trí tuệ nhân tạo" },
                    { title: "10 cảnh báo" },
                    { title: "5 nhóm cảnh báo" },
                    { title: "5.000 thông báo qua Email" },
                    { title: "5.000 thông báo qua Telegram" },
                    { title: "5.000 thông báo qua Viber" },
                    { title: "Không giới hạn đọc biểu đồ phân tích" },
                    { title: "Không giới hạn chức năng cập nhật xu hướng" },
                    { title: "Không giới hạn chức năng tìm kiếm thông tin" },
                ]
            },
            {
                id: 2, title: "Gói cao cấp", description: "Dùng không giới hạn chức năng nâng cao", icon: "bx-run", price: "299", duration: "tháng", link: "", call_action: "Mua ngay",
                features: [
                    { title: "Ưu tiên hỗ trợ qua hotline riêng" },
                    { title: "Không giới hạn huấn luyện trí tuệ nhân tạo" },
                    { title: "60 cảnh báo" },
                    { title: "10 nhóm cảnh báo" },
                    { title: "20.000 thông báo qua Email" },
                    { title: "20.000 thông báo qua Telegram" },
                    { title: "20.000 thông báo qua Viber" },
                    { title: "Không giới hạn đọc biểu đồ phân tích" },
                    { title: "Không giới hạn chức năng cập nhật xu hướng" },
                    { title: "Không giới hạn chức năng tìm kiếm thông tin" },
                ]
            },
            {
                id: 3, title: "Gói doanh nghiệp", description: "Tùy chỉnh chức năng theo yêu cầu\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0", icon: "bx-cycling", price: "", duration: "Liên hệ ngay", link: "", call_action: "Liên hệ ngay",
                special_features: [
                    { title: "Tùy chỉnh tính năng phù hợp với doanh nghiệp" },
                    { title: "Thiết lập bản web theo nhu cầu của doanh nghiệp" },
                ],
                features: [
                    { title: "Ưu tiên hỗ trợ qua hotline riêng" },
                    { title: "Không giới hạn huấn luyện trí tuệ nhân tạo" },
                    { title: "Không giới hạn tạo cảnh báo" },
                    { title: "Không giới hạn nhóm cảnh báo" },
                    { title: "Không giới hạn thông báo đa kênh: Email, Telegram, Viber, ứng dụng" },
                    { title: "Không giới hạn đọc biểu đồ phân tích" },
                    { title: "Không giới hạn chức năng cập nhật xu hướng" },
                    { title: "Không giới hạn chức năng tìm kiếm thông tin" },
                ]
            },
        ]
    }
    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4>Đăng ký gói dịch vụ</h4>
                </div>
              </Col>
            </Row>


                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <div className="text-center mb-5">
                                    <h4>Tiết kiệm hơn khi đăng ký theo gói</h4>
                                    <p className="text-muted">VnAlert hiểu rằng bạn có nhu cầu sử dụng thường xuyên các tính năng nâng cao của ứng dụng. Vì vậy chúng tôi mang đến những Gói dịch vụ đa dạng để bạn lựa chọn theo nhu cầu. Tiết kiệm hơn mỗi ngày khi sử dụng VnAlert.</p>
                                </div>
                            </Col>
                        </Row>
                            
                        <Row className="justify-content-center">

            
                            {
                                this.state.pricings.map((pricing, key) =>
                                <Col xl="3" md="3" className="mb-4">
                                    <CardPricing pricing={pricing} key={"_pricing_" + key} />
                                    </Col>
                                )
                            }
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default PricingPlans;
