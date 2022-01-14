import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  ButtonDropdown,
  Media,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  CardBody,
  CardTitle,
} from "reactstrap";
import classnames from "classnames";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import LineChart from "./LineChart";
import "./alert.scss";

//Import Breadcrumb
import title from "../../assets/images/title-icon.svg";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import News from "../../assets/images/News.svg";
import MXH from "../../assets/images/MXH.svg";
import Blog from "../../assets/images/Blog.svg";
import Youtube from "../../assets/images/Youtube.svg";
import loader from "../../assets/images/vnalert.svg";

class SearchKeyword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_Menu: false,
      searchResults: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      timeFilter: false,
      filter: [
        { title: "3h", linkto: "#", isActive: true, duration: 180 },
        { title: "12h", linkto: "#", isActive: false, duration: 720 },
        { title: "48h", linkto: "#", isActive: false, duration: 2880 },
        { title: "7 ngày", linkto: "#", isActive: false, duration: 10080 },
      ],
      activeTab: "1",
    };

    this.toggleSearch = this.toggleSearch.bind(this);
  }
  //Toggle Chat Box Menus
  toggleSearch() {
    this.setState((prevState) => ({
      search_Menu: !prevState.search_Menu,
    }));
  }

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  filterClick(duration) {
    if (duration == 180) {
      this.setState({
        filter: [
          { title: "3h", linkto: "#", isActive: true, duration: 180 },
          { title: "12h", linkto: "#", isActive: false, duration: 720 },
          { title: "48h", linkto: "#", isActive: false, duration: 2880 },
          { title: "7 ngày", linkto: "#", isActive: false, duration: 10080 },
        ],
      });
    }

    if (duration == 720) {
      this.setState({
        filter: [
          { title: "3h", linkto: "#", isActive: false, duration: 180 },
          { title: "12h", linkto: "#", isActive: true, duration: 720 },
          { title: "48h", linkto: "#", isActive: false, duration: 2880 },
          { title: "7 ngày", linkto: "#", isActive: false, duration: 10080 },
        ],
      });
    }

    if (duration == 2880) {
      this.setState({
        filter: [
          { title: "3h", linkto: "#", isActive: false, duration: 180 },
          { title: "12h", linkto: "#", isActive: false, duration: 720 },
          { title: "48h", linkto: "#", isActive: true, duration: 2880 },
          { title: "7 ngày", linkto: "#", isActive: false, duration: 10080 },
        ],
      });
    }

    if (duration == 10080) {
      this.setState({
        filter: [
          { title: "3h", linkto: "#", isActive: false, duration: 180 },
          { title: "12h", linkto: "#", isActive: false, duration: 720 },
          { title: "48h", linkto: "#", isActive: false, duration: 2880 },
          { title: "7 ngày", linkto: "#", isActive: true, duration: 10080 },
        ],
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            {/* <Breadcrumbs title="" breadcrumbItem="" /> */}
            <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4>Chi tiết chủ đề</h4>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg="9">
                <Row>
                  <Col lg="12">
                    <Card>
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <CardTitle
                            className="d-flex align-items-center"
                            style={{ margin: 0 }}
                          >
                            Mưa
                          </CardTitle>

                          <div
                            style={{
                              // backgroundColor: "#FAFAFB",
                              // padding: "8px",
                              borderRadius: "10px",
                              // marginBottom: "12px",
                              alignSelf: "center",
                            }}
                          >
                            <ButtonDropdown
                              isOpen={this.state.timeFilter}
                              toggle={() =>
                                this.setState({
                                  timeFilter: !this.state.timeFilter,
                                })
                              }
                            >
                              <DropdownToggle
                                caret
                                id="dropdown-toggle"
                                // color="info"
                                className="btn-sm w-xs"
                                style={{
                                  color: "#495057",
                                  backgroundColor: "#F8F8F8",
                                  borderColor: "#fff",
                                }}
                              >
                                {
                                  this.state.filter.find(
                                    (filter) => filter.isActive
                                  ).title
                                }{" "}
                                <i className="mdi mdi-chevron-down"></i>
                              </DropdownToggle>
                              <DropdownMenu>
                                {this.state.filter.map((filter, key) => (
                                  <DropdownItem
                                    onClick={() =>
                                      this.filterClick(filter.duration)
                                    }
                                  >
                                    {filter.title}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </div>
                        </div>
                        <Nav pills justified>
                          <NavItem style={{ backgroundColor: "#F8F8F8" }}>
                            <NavLink
                              // className={classnames({ active: this.state.activeTab === '2' })}
                              onClick={() => {
                                this.toggleTab("2");
                              }}
                            >
                              <i className="bx bx-group font-size-20 d-sm-none"></i>
                              <span className="d-none d-sm-block">
                                Ẩn biểu đồ
                              </span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <div className="clearfix"></div>
                        <LineChart />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <Card>
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <h6
                            className="d-flex align-items-center"
                            style={{ margin: 0 }}
                          >
                            Bài viết mới nhất
                          </h6>
                        </div>
                        <div className="clearfix"></div>
                        <div className="">
                          <div className="table-responsive">
                            <Table
                              className="project-list-table table-nowrap table-centered table-borderless"
                              style={{}}
                            >
                              <thead></thead>
                              <tbody>
                                      {this.state.searchResults.map((post) => (
                                        <tr style={{}}>
                                          <td className="pt-0 pl-0 pr-0">
                                            <div
                                              style={{
                                                paddingTop: 0,
                                                whiteSpace: "normal",
                                                wordWrap: "break-all",
                                              }}
                                            >
                                              <h6
                                                style={{
                                                  maxWidth: "100%",
                                                  display: "-webkit-box",
                                                  WebkitBoxOrient: "vertical",
                                                  lineHeight:1.3,
                                                  WebkitLineClamp: 2,
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",

                                                  color: "#495057",
                                                  margin: 0,
                                                }}
                                                className=" mb-2"
                                              >
                                                Cận cảnh 'hố tử thần' sâu 5 mét,
                                                rộng hơn 10 mét ở Hà Nội
                                              </h6>
                                            </div>

                                            <div
                                              style={{
                                                paddingTop: 0,
                                                whiteSpace: "normal",
                                                wordWrap: "break-all",
                                              }}
                                            >
                                              <a
                                                style={{
                                                  maxWidth: "100%",
                                                  display: "-webkit-box",
                                                  WebkitBoxOrient: "vertical",
                                                  WebkitLineClamp: 2,
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",

                                                  color: "#495057",
                                                  margin: 0,
                                                }}
                                                className="mb-0"
                                                href="#"
                                              >
                                                Chiều 6/4, một "hố tử thần"
                                                bất ngờ xuất hiện trước cửa nhà
                                                dân tại xã Quảng Bị, huyện
                                                Chương Mỹ, Hà Nội, khiến nhiều
                                                hộ dân ở đây phải sơ tán.
                                              </a>
                                            </div>

                                            <div
                                              style={{
                                                paddingTop: 0,
                                                whiteSpace: "normal",
                                                wordWrap: "break-all",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  maxWidth: "100%",
                                                  display: "-webkit-box",
                                                  WebkitBoxOrient: "vertical",
                                                  WebkitLineClamp: 1,
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",

                                                  color: "#495057",
                                                  margin: 0,
                                                }}
                                                className="text-muted mt-2"
                                              >
                                                <img src={News} alt="" height="14" className="mr-1" /><small>                                                1 giờ trước - Tin tức 24h hàng
                                                ngày</small>
                                              </p>
                                            </div>
                                            <div className="d-flex flex-row mt-2">
                                              <Badge
                                                className={
                                                  "font-size-12 mr-2 p-1 badge-soft-" +
                                                  "success"
                                                }
                                                color="success"
                                                style={{ borderRadius: "4px" }}
                                                pill
                                              >
                                                Tích cực
                                              </Badge>
                                              <Badge
                                                className={
                                                  "font-size-12 p-1 badge-soft-" +
                                                  "warning"
                                                }
                                                color="warning"
                                                style={{ borderRadius: "4px" }}
                                                pill
                                              >
                                                Tác động kinh tế
                                              </Badge>
                                            </div>
                                            <div
                                              className="mt-3"
                                              style={{
                                                width: "100%",
                                                height: "2px",
                                                backgroundColor: "#f8f8f8",
                                              }}
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                            </Table>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>

              <Col lg="3">
                <div>

                  <div>
                    <div className="mb-4">
                      <h6>Nguồn tin</h6>
                    </div>

                    <div className=" button-items mb-4">
                      <button
                        type="button"
                        className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#fff",
                          width: 160,
                        }}
                      >
                        <span>
                          <img src={News} alt="" height="16" className="mr-2" />
                          Chính thống{" "}
                        </span>
                        <i
                          className="bx bx-check font-size-16 align-middle "
                          style={{ color: "#3E64FF" }}
                        ></i>
                      </button>
                      <button
                        type="button"
                        className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#fff",
                          width: 160,
                        }}
                      >
                        <span>
                          <img src={Blog} alt="" height="16" className="mr-2" />
                          Blog/Web{" "}
                        </span>
                        <i
                          className="bx bx-check font-size-16 align-middle "
                          style={{ color: "#3E64FF" }}
                        ></i>
                      </button>
                      <button
                        type="button"
                        className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#fff",
                          width: 160,
                        }}
                      >
                        <span>
                          <img src={MXH} alt="" height="16" className="mr-2" />
                          Facebook{" "}
                        </span>
                        <i
                          className="bx bx-check font-size-16 align-middle "
                          style={{ color: "#3E64FF" }}
                        ></i>
                      </button>

                      <button
                        type="button"
                        className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#fff",
                          width: 160,
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
                        <i
                          className="bx bx-check font-size-16 align-middle "
                          style={{ color: "#3E64FF" }}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <h6>Tính chất thông tin</h6>
                    </div>

                    <div className=" button-items mb-2">
                      <button
                        type="button"
                        className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#fff",
                          width: 160,
                        }}
                      >
                        Tích cực{"  "}{" "}
                        <i
                          className="bx bx-check font-size-16 align-middle "
                          style={{ color: "#3E64FF" }}
                        ></i>
                      </button>
                      <button
                        type="button"
                        className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#fff",
                          width: 160,
                        }}
                      >
                        Tiêu cực{"  "}{" "}
                        <i
                          className="bx bx-check font-size-16 align-middle "
                          style={{ color: "#3E64FF" }}
                        ></i>
                      </button>
                      <button
                        type="button"
                        className="btn waves-effect waves-light d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#fff",
                          width: 160,
                        }}
                      >
                        Trung tính{"  "}{" "}
                        <i
                          className="bx bx-check font-size-16 align-middle "
                          style={{ color: "#3E64FF" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchKeyword;
