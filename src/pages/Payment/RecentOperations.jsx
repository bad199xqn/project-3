import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  Table,
  Label,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Pagination,
  PaginationItem,
  PaginationLink,
  Tooltip,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CrashPage from "../Error/CrashPage";

import coinIcon from "../../assets/images/Coin.svg";
import { api_v1 } from "../../services/api";

class RecentOperations extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      Orders: [
        // {
        //   id: "customCheck2",
        //   orderId: "#SK2540",
        //   billingName: "Neal Matthews",
        //   Date: "07 Oct, 2019",
        //   total: "$400",
        //   badgeclass: "success",
        //   paymentStatus: "Paid",
        //   methodIcon: "fa-cc-mastercard",
        //   paymentMethod: "Mastercard",
        //
        // },
      ],
      modal: false,
      page: 1,
      screenWidth: window.innerWidth,
      showDetail: [],
      tooltipOpen: false,
    };
    this.togglemodal.bind(this);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  togglemodal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  paginationClick = (page) => {
    this.setState({
      page: page,
    });
    this.getUserBills(page, this.props.login.userKey.key);
  };

  getUserBills = (page, key) => {
    const config = {
      method: "get",
      url: `${api_v1}/bills/?format=json&page=${page}`,
      headers: {
        Authorization: `Token ${key}`,
      },
    };

    axios(config)
      .then((response) => {
        this.setState({
          Orders: response.data.results,
        });
      })
      .catch(function (error) {});
  };

  publishDate = (date) => {
    const pub_date = moment(date);
    const publish_date =
      pub_date.format("HH:mm") + " " + pub_date.format("DD-MM-YYYY");
    return publish_date;
  };

  componentDidMount() {
    if (this.props.userDetails === null) {
      this.props.userDetailsRequest(this.props.login.userKey.key);
    }
    this.getUserBills(1, this.props.login.userKey.key);

    // line 106
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  // theo dõi sự thay đổi kích thước màn hình
  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };
  componentWillMount() {
    window.removeEventListener("resize", this.updateWindowDimensions());
  }

  //click hiển thị chi tiết hàng
  showDetailRecent = (index) => {
    let { showDetail } = this.state;
    if (showDetail.filter((item) => item === index).length === 0) {
      this.setState({ showDetail: [...showDetail, index] });
    } else {
      let newDetail = showDetail.filter((item) => item !== index);
      this.setState({ showDetail: newDetail });
    }
  };

  render() {
    const pages = [1, 2, 3, 4, 5];
    try {
      return (
        <React.Fragment>
          <div className="page-content">
            <Container fluid>
              <Row>
                <Col xs="12 d-flex">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4>Token/Thanh toán</h4>
                  </div>
                  <img
                    src="help.svg"
                    alt=""
                    width="18"
                    height="18"
                    id="hint"
                    className="ml-2"
                  />
                  <Tooltip
                    placement="bottom"
                    isOpen={this.state.tooltipOpen}
                    target="hint"
                    toggle={this.toggle}
                  >
                    Token cần thiết cho nhiều chức năng trong VNAlert.
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <Row className="mb-2">
                        <Col sm="5" className="text-xs-center">
                          {this.props.userDetails !== null && (
                            <div className="d-flex flex-row align-items-center h-100">
                              <h4 className="mx-auto">
                                Số dư token:{" "}
                                <span className="text-warning mr-1">
                                  {this.props.userDetails.pocket.balance}
                                </span>
                                <img src={coinIcon} alt="Token" />
                              </h4>
                            </div>
                          )}
                        </Col>
                        <Col sm="7" className="pt-sm-0 pt-2">
                          <div className="text-sm-right text-center">
                            <Link to="/payment">
                              <Button
                                type="button"
                                color="warning"
                                className="btn-rounded waves-effect waves-light mb-2 mr-2"
                              >
                                <i className="mdi mdi-plus mr-1"></i> Nạp token
                              </Button>
                            </Link>
                            <Link to="/pricing-plans">
                              {" "}
                              <Button
                                type="button"
                                color="success"
                                className="btn-rounded waves-effect waves-light mb-2 mr-2"
                              >
                                <i className="mdi mdi-plus mr-1"></i> Mua gói
                                cước
                              </Button>
                            </Link>
                          </div>
                        </Col>
                      </Row>

                      <div className="table-responsive">
                        {!this.state.Orders.length || !this.state.Orders ? (
                          <h2 className="mt-5 text-center">
                            Bạn chưa có bất kì thanh toán nào
                          </h2>
                        ) : (
                          <div>
                            <Table className="table table-centered">
                              <thead className="thead-light">
                                <tr>
                                  <th
                                    className={
                                      this.state.screenWidth < 630
                                        ? "d-none"
                                        : ""
                                    }
                                  >
                                    Thời gian
                                  </th>
                                  <th>Nội dung</th>
                                  <th>Số token</th>
                                  <th style={{ paddingLeft: 0 }}></th>
                                </tr>
                              </thead>
                              {this.state.screenWidth < 630 ? (
                                <tbody>
                                  {this.state.Orders.map((order, key) => (
                                    <>
                                      <tr
                                        key={"_order_" + key}
                                        onClick={() =>
                                          this.showDetailRecent(key)
                                        }
                                      >
                                        {/* <td>{this.publishDate(order.date)}</td> */}
                                        <td>
                                          <span>{order.description}</span>
                                        </td>
                                        <td>
                                          <span className="text-warning d-flex flex-row align-items-center">
                                            <span>{order.amount}</span>
                                            <img
                                              src={coinIcon}
                                              style={{ height: 14 }}
                                              className="ml-1"
                                              alt="Used Token"
                                            />
                                          </span>
                                        </td>
                                        <td style={{ paddingLeft: 0 }}>
                                          {this.state.showDetail.filter(
                                            (item) => item === key
                                          ).length > 0 ? (
                                            <i class="fas fa-chevron-up fa-sm text-black-50"></i>
                                          ) : (
                                            <i class="fas fa-chevron-down fa-sm text-black-50"></i>
                                          )}
                                        </td>
                                      </tr>

                                      <tr
                                        className={
                                          this.state.showDetail.filter(
                                            (item) => item === key
                                          ).length > 0
                                            ? ""
                                            : "d-none"
                                        }
                                      >
                                        <td className="border-0 pt-0 px-4">
                                          <span className="text-black-50">
                                            Thời gian:{" "}
                                            {this.publishDate(order.date)}
                                          </span>
                                        </td>
                                      </tr>
                                    </>
                                  ))}
                                </tbody>
                              ) : (
                                <tbody>
                                  {this.state.Orders.map((order, key) => (
                                    <tr key={"_order_" + key}>
                                      <td>{this.publishDate(order.date)}</td>
                                      <td>{order.description}</td>
                                      <td>
                                        <span className="text-warning d-flex flex-row align-items-center">
                                          <span>{order.amount}</span>
                                          <img
                                            src={coinIcon}
                                            style={{ height: 14 }}
                                            className="ml-1"
                                            alt="Used Token"
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              )}
                            </Table>

                            <nav aria-label="...">
                              <ul className="pagination justify-content-center mt-3 mb-0">
                                {pages.map((page) => {
                                  return this.state.page === page ? (
                                    <li className="page-item active ml-1 mr-1">
                                      <Link
                                        style={{
                                          width: "34px",
                                          borderRadius: "50%",
                                        }}
                                        className="page-link justify-content-center d-flex"
                                        onClick={() =>
                                          this.paginationClick(page)
                                        }
                                      >
                                        {page}{" "}
                                        <span className="sr-only">
                                          (current)
                                        </span>
                                      </Link>
                                    </li>
                                  ) : (
                                    <li className="page-item ml-1 mr-1">
                                      <Link
                                        style={{
                                          width: "34px",
                                          borderRadius: "50%",
                                        }}
                                        className="page-link justify-content-center d-flex"
                                        onClick={() =>
                                          this.paginationClick(page)
                                        }
                                      >
                                        {page}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </nav>
                          </div>
                        )}
                      </div>
                      {/* {!this.state.Orders.length ||
                      !this.state.Orders ? null : (
                        <nav aria-label="...">
                          <ul className="pagination justify-content-center mt-3 mb-0">
                            {pages.map((page) => {
                              return this.state.page === page ? (
                                <li className="page-item active ml-1 mr-1">
                                  <Link
                                    style={{
                                      width: "34px",
                                      borderRadius: "50%",
                                    }}
                                    className="page-link justify-content-center d-flex"
                                    onClick={() => this.paginationClick(page)}
                                  >
                                    {page}{" "}
                                    <span className="sr-only">(current)</span>
                                  </Link>
                                </li>
                              ) : (
                                <li className="page-item ml-1 mr-1">
                                  <Link
                                    style={{
                                      width: "34px",
                                      borderRadius: "50%",
                                    }}
                                    className="page-link justify-content-center d-flex"
                                    onClick={() => this.paginationClick(page)}
                                  >
                                    {page}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      )} */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
      );
    } catch (error) {
      return <CrashPage />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.Login,
    userDetails: state.UserDetails.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
)(withRouter(RecentOperations));
