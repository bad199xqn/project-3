import React, { Component } from "react";
import {
  Label,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Button,
  CardSubtitle,
  Modal,
  Alert,
  Tooltip,
} from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import numberWithDots from "../../utils/numberWithDots";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Product Images
import img1 from "../../assets/images/product/img-1.png";
import img2 from "../../assets/images/product/img-2.png";
import img3 from "../../assets/images/product/img-3.png";
import img4 from "../../assets/images/product/img-4.png";
import img5 from "../../assets/images/product/img-5.png";
import img6 from "../../assets/images/product/img-6.png";
import ckThuCong from "../../assets/images/ck-thu-cong.svg";
import ckCard from "../../assets/images/ck-card.svg";
import coinIcon from "../../assets/images/Coin.svg";
import CrashPage from "../Error/CrashPage";

import "./payment.scss";
import { api_v1 } from "../../services/api";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [
        {
          id: "SP04.07",
          img: img1,
          name: (
            <div className="d-flex flex-row align-items-center">
              <img src={coinIcon} style={{ height: "18px" }}></img>
              <h5 className="font-size-14 text-truncate text-warning mb-0 ml-1">
                500 token
              </h5>
            </div>
          ),
          price: 49000,
          number: 0,
          total: 0,
        },
        {
          id: "SP04.08",
          img: img2,
          name: (
            <div className="d-flex flex-row align-items-center">
              <img src={coinIcon} style={{ height: "18px" }}></img>
              <h5 className="font-size-14 text-truncate text-warning mb-0 ml-1">
                1000 token
              </h5>
            </div>
          ),
          price: 99000,
          number: 1,
          total: 99000,
        },
        {
          id: "SP04.09",
          img: img3,
          name: (
            <div className="d-flex flex-row align-items-center">
              <img src={coinIcon} style={{ height: "18px" }}></img>
              <h5 className="font-size-14 text-truncate text-warning mb-0 ml-1">
                1500 token
              </h5>
            </div>
          ),
          price: 149000,
          number: 0,
          total: 0,
        },
      ],
      paymentType: 4,
      toggleSwitch: false,
      name: null,
      company: "",
      taxCode: "",
      address: "",
      email: null,
      coupon: "",
      vnPayUrl: null,
      orderId: null,
      paymentAlert: false,
      billAlert: false,
      tabIndex: 1,
      tooltipOpen1: false,
      tooltipOpen2: false,
      tooltipOpen3: false,
    };
    this.countUP.bind(this);
    this.countDown.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(tooltip) {
    switch (tooltip) {
      case 1:
        this.setState({
          tooltipOpen1: !this.state.tooltipOpen1,
        });
        break;
      case 2:
        this.setState({
          tooltipOpen2: !this.state.tooltipOpen2,
        });
        break;
      case 3:
        this.setState({
          tooltipOpen3: !this.state.tooltipOpen3,
        });
        break;
      default:
        break;
    }
  }

  onChangeNameBill = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeCompanyBill = (e) => {
    this.setState({
      company: e.target.value,
    });
  };

  onChangeAddressBill = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  onChangeTaxCodeBill = (e) => {
    this.setState({
      taxCode: e.target.value,
    });
  };

  onChangeEmailBill = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  countUP = (id, prev_data_attr) => {
    this.setState({
      package_code: id,
      productList: this.state.productList.map((p) =>
        p.id === id
          ? {
              ...p,
              number: prev_data_attr + 1,
              total: p.price * (prev_data_attr + 1),
            }
          : { ...p, number: 0, total: 0 }
      ),
    });
  };

  countDown = (id, prev_data_attr) => {
    this.setState({
      package_code: id,
      productList: this.state.productList.map((p) =>
        p.id === id && p.number >= 1
          ? {
              ...p,
              number: prev_data_attr - 1,
              total: p.price * (prev_data_attr - 1),
            }
          : { ...p, number: 0, total: 0 }
      ),
    });
  };

  // cal = (id, number) => {
  //   this.setState({
  //     package_code: id,
  //     productList: this.state.productList.map((p) =>
  //       p.id === id && p.number >= 1
  //         ? {
  //             ...p,
  //             number: number,
  //             total: p.price * (number - 1)/,
  //           }
  //         : { ...p, number: 0, total: 0 }
  //     ),
  //   });
  // };

  changePlan = (plan) => {
    if (plan === "G??i ti??u chu???n") {
      this.setState({
        productList: [
          {
            id: "SP04.01",
            img: img1,
            name: (
              <h5 className="font-size-14 text-truncate text-primary mb-0">
                G??i ti??u chu???n - 1 th??ng
              </h5>
            ),
            price: 99000,
            number: 1,
            total: 99000,
          },
          {
            id: "SP04.03",
            img: img2,
            name: (
              <h5 className="font-size-14 text-truncate text-primary mb-0">
                G??i ti??u chu???n - 6 th??ng
              </h5>
            ),
            price: 499000,
            number: 0,
            total: 0,
          },
          {
            id: "SP04.05",
            img: img3,
            name: (
              <h5 className="font-size-14 text-truncate text-primary mb-0">
                G??i ti??u chu???n - 1 n??m
              </h5>
            ),
            price: 950000,
            number: 0,
            total: 0,
          },
        ],
      });
    }
    if (plan === "G??i cao c???p") {
      this.setState({
        productList: [
          {
            id: "SP04.02",
            img: img1,
            name: (
              <h5 className="font-size-14 text-truncate text-primary mb-0">
                G??i cao c???p - 1 th??ng
              </h5>
            ),
            price: 299000,
            number: 1,
            total: 299000,
          },
          {
            id: "SP04.04",
            img: img2,
            name: (
              <h5 className="font-size-14 text-truncate text-primary mb-0">
                G??i cao c???p - 6 th??ng
              </h5>
            ),
            price: 1499000,
            number: 0,
            total: 0,
          },
          {
            id: "SP04.06",
            img: img3,
            name: (
              <h5 className="font-size-14 text-truncate text-primary mb-0">
                G??i cao c???p - 1 n??m
              </h5>
            ),
            price: 1900000,
            number: 0,
            total: 0,
          },
        ],
      });
    }
  };

  onCouponButtonClick = () => {};

  onPaymentButtonClick = (key) => {
    const billCheck =
      this.state.toggleSwitch &&
      (this.state.name === "" ||
        this.state.address === "" ||
        this.state.email === "" ||
        this.state.company === "" ||
        this.state.taxCode === "");

    const product = this.state.productList.find((p) => p.total > 0);
    if (product === undefined) {
      this.setState({
        paymentAlert: true,
      });
    }
    if (billCheck) {
      this.setState({
        billAlert: true,
      });
    }

    if (product && !billCheck) {
      const data = JSON.stringify({
        package_code: product.id,
        number: product.number,
        coupon: this.state.coupon,
        payment_type: this.state.paymentType,
      });

      const config = {
        method: "post",
        url: api_v1 + "/calculate_payment?format=json",
        headers: {
          Authorization: `Token ${key}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(data);
          if (this.state.toggleSwitch) {
            this.updateBillInfo(key, data);
            console.log("gui bill");
          }
          if (!this.state.toggleSwitch) {
            this.requestPayment(key, data);
            console.log("khong gui bill");
          }
        })
        .catch(function (error) {});
    }
  };

  requestPayment = (key, data) => {
    const config = {
      method: "post",
      url: api_v1 + "/payment?format=json",
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({
          vnPayUrl: this.state.paymentType === 3 ? response.data.url : null,
          orderId: response.data.order_id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateBillInfo = (key, paymentData) => {
    const data = JSON.stringify({
      fullname: this.state.name,
      company: this.state.company,
      tax_code: this.state.taxCode,
      address: this.state.address,
      bill_email: this.state.email,
    });
    const config = {
      method: "post",
      url: api_v1 + "/update_bill_info?format=json",
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.requestPayment(key, paymentData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  changePlanTime = (id) => {
    this.setState({
      productList: this.state.productList.map((p) =>
        p.id === id
          ? { ...p, number: 1, total: p.price }
          : { ...p, number: 0, total: 0 }
      ),
    });
  };

  componentDidMount() {
    console.log(this.state.vnPayUrl);
    const userDetails =
      this.props.userDetails === null
        ? {
            first_name: "",
            last_name: "",
            email: "",
          }
        : this.props.userDetails;
    if (this.props.location.state) {
      const plan = this.props.location.state.plan;
      this.changePlan(plan);
    }
    if (this.props.userDetails === null) {
      this.props.userDetailsRequest(this.props.login.userKey.key);
    } else {
      this.setState({
        name: userDetails.last_name + " " + userDetails.first_name,
        email: userDetails.email,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.vnPayUrl !== null) {
      window.location.href = this.state.vnPayUrl;
    }
    if (this.props.userDetails !== null && this.state.name === null) {
      const userDetails = this.props.userDetails;
      this.setState({
        name: userDetails.last_name + " " + userDetails.first_name,
        email: userDetails.email,
      });
    }
  }

  render() {
    const plan_name = this.props.location.state
      ? this.props.location.state.plan
      : "G??i token";
    const token_plan = this.state.productList.find((p) => p.total > 0);
    const token_money = token_plan ? token_plan.total : 0;
    try {
      return (
        <React.Fragment>
          <div className="page-content">
            <Container fluid>
              <Row>
                <Col xs="12 d-flex">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4>Thanh to??n</h4>
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
                    isOpen={this.state.tooltipOpen1}
                    target="hint"
                    toggle={() => this.toggle(1)}
                  >
                    Token c???n thi???t cho nhi???u ch???c n??ng trong VNAlert.
                  </Tooltip>
                </Col>
              </Row>

              <Row>
                <Col lx="6">
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-3">{plan_name}</CardTitle>
                      <div className="">
                        <Alert
                          // className="dismissing-alert"
                          color="danger"
                          isOpen={this.state.paymentAlert}
                          toggle={() =>
                            this.setState({
                              paymentAlert: false,
                            })
                          }
                        >
                          Vui l??ng ch???n g??i token
                        </Alert>
                      </div>
                      <div>
                        <Tabs
                          selectedIndex={this.state.tabIndex}
                          onSelect={(tabIndex) => this.setState({ tabIndex })}
                        >
                          <TabList>
                            {this.state.productList.map((product, key) => {
                              return <Tab>{product.name}</Tab>;
                            })}
                          </TabList>

                          {this.state.productList.map((product, index) => {
                            return (
                              <TabPanel>
                                <Table>
                                  <thead>
                                    <tr>
                                      <th>G??i</th>
                                      <th>S??? l?????ng</th>
                                      <th style={{ textAlign: "center" }}>
                                        T???ng ti???n
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td style={{ verticalAlign: "middle" }}>
                                        {this.state.productList[index].name}
                                      </td>
                                      <td style={{ verticalAlign: "middle" }}>
                                        <h5>
                                          {numberWithDots(product.total)}??
                                        </h5>
                                      </td>
                                      <td
                                        className="td-right"
                                        style={{
                                          width: "150px",
                                          textAlign: "right",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        <div>
                                          <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <Button
                                                color="primary"
                                                onClick={() => {
                                                  this.countDown(
                                                    product.id,
                                                    product.number
                                                  );
                                                }}
                                              >
                                                -
                                              </Button>
                                            </InputGroupAddon>
                                            <Input
                                              type="text"
                                              value={product.number}
                                              name="demo_vertical"
                                              style={{
                                                textAlign: "center",
                                              }}
                                            />
                                            <InputGroupAddon addonType="append">
                                              <Button
                                                color="primary"
                                                onClick={() => {
                                                  this.countUP(
                                                    product.id,
                                                    product.number
                                                  );
                                                }}
                                              >
                                                +
                                              </Button>
                                            </InputGroupAddon>
                                          </InputGroup>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </TabPanel>
                            );
                          })}
                        </Tabs>
                      </div>
                    </CardBody>
                  </Card>
                  <Card style={{ height: 264 }}>
                    <CardBody>
                      <CardTitle className="mb-3">Chi ti???t giao d???ch</CardTitle>

                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <tbody>
                            <tr>
                              <td>G??i token :</td>
                              <td className="">
                                <div className="d-flex flex-row  float-right">
                                  {token_plan ? (
                                    <span>{token_plan.number + "x\xa0"}</span>
                                  ) : null}{" "}
                                  {token_plan ? token_plan.name : "0"}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Ph?? thanh to??n : </td>
                              <td className="td-right">
                                {numberWithDots(token_money)}??
                              </td>
                            </tr>
                            <tr>
                              <td>Khuy???n m??i :</td>
                              <td className="td-right">0??</td>
                            </tr>

                            <tr>
                              <th>T???ng ti???n :</th>
                              <th className="td-right">
                                {numberWithDots(token_money)}??
                              </th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xl="6">
                  <Card>
                    <CardBody className="mb-0">
                      <CardTitle className="mb-3">
                        X??c nh???n thanh to??n
                      </CardTitle>
                      <div className="px-3">
                        <Label>Khuy???n m??i</Label>
                        <Row className="">
                          <Col sm="8" xs="8" md="9" lg="8">
                            <Input
                              type="text"
                              className="inner form-control"
                              placeholder="Nh???p m?? gi???m gi??"
                            />
                          </Col>
                          <Col sm="4" xs="4" md="3" lg="4">
                            <Button
                              onClick={this.onCouponButtonClick}
                              color="primary"
                              className="btn-block inner"
                              style={{ width: "100%" }}
                            >
                              {" "}
                              ??p d???ng{" "}
                            </Button>
                          </Col>
                        </Row>

                        <div>
                          <Label className="mt-4">Ph????ng th???c thanh to??n</Label>
                          <div className=" button-items d-flex justify-content-start mb-2">
                            <div>
                              <button
                                type="button"
                                className="btn d-flex align-items-center justify-content-between"
                                style={{
                                  backgroundColor: "#f8f8fb",
                                  borderColor: "#f8f8fb",
                                  width: 180,
                                  height: 42,
                                }}
                                onClick={() =>
                                  this.setState({
                                    paymentType: 4,
                                  })
                                }
                                id="hint_banking"
                              >
                                <img
                                  src={ckThuCong}
                                  alt=""
                                  height="16"
                                  className="mr-2"
                                />
                                <span>Chuy???n kho???n th??? c??ng </span>
                                <i
                                  className="bx bx-check font-size-16 align-middle ml-2"
                                  style={{
                                    color:
                                      this.state.paymentType === 4
                                        ? "#3E64FF"
                                        : "#f8f8fb",
                                  }}
                                ></i>
                              </button>
                              <Tooltip
                                placement="top"
                                isOpen={this.state.tooltipOpen2}
                                target="hint_banking"
                                toggle={() => this.toggle(2)}
                              >
                                Thanh to??n th??ng qua h??nh th???c banking, ch??ng
                                t??i s??? c??ng c???p th??ng tin chuy???n kho???n cho b???n
                                ngay sau khi b???n ti???n h??nh thanh to??n.
                              </Tooltip>
                            </div>

                            <div>
                              <button
                                type="button"
                                className="btn d-flex align-items-center justify-content-between"
                                style={{
                                  backgroundColor: "#f8f8fb",
                                  borderColor: "#f8f8fb",
                                  width: 180,
                                  height: 42,
                                }}
                                onClick={() =>
                                  this.setState({
                                    paymentType: 3,
                                  })
                                }
                                id="hint_vnpay"
                              >
                                <img
                                  src={ckCard}
                                  alt=""
                                  height="16"
                                  className="mr-2"
                                />
                                <span>Th??? n???i ?????a </span>
                                <i
                                  className="bx bx-check font-size-16 align-middle ml-2"
                                  style={{
                                    color:
                                      this.state.paymentType === 3
                                        ? "#3E64FF"
                                        : "#f8f8fb",
                                  }}
                                ></i>
                              </button>
                              <Tooltip
                                placement="top"
                                isOpen={this.state.tooltipOpen3}
                                target="hint_vnpay"
                                toggle={() => this.toggle(3)}
                              >
                                Thanh to??n tr???c tuy???n th??ng qua VNPAY.
                              </Tooltip>
                            </div>
                          </div>

                          <div>
                            <div
                              className="custom-control custom-switch left mb-2 mt-3"
                              dir="ltr"
                            >
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitch1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customSwitch1"
                                onClick={(e) => {
                                  this.setState({
                                    toggleSwitch: !this.state.toggleSwitch,
                                  });
                                }}
                              >
                                Th??ng tin xu???t h??a ????n
                              </label>
                            </div>
                            <div>
                              <CardSubtitle className="mb-3">
                                VnAlert s??? g???i h??a ????n ??i???n t??? theo email b???n
                                ??i???n b??n d?????i. T??m hi???u th??m
                              </CardSubtitle>
                            </div>
                            <div>
                              <Alert
                                className="dismissing-alert"
                                color="danger"
                                isOpen={this.state.billAlert}
                                toggle={() =>
                                  this.setState({
                                    billAlert: false,
                                  })
                                }
                              >
                                B???n c???n nh???p ?????y ????? th??ng tin h??a ????n
                              </Alert>
                            </div>
                            {this.state.toggleSwitch && (
                              <div>
                                <div>
                                  <Input
                                    value={this.state.name}
                                    type="text"
                                    className="inner form-control mb-2"
                                    placeholder="H??? t??n ng?????i mua h??ng"
                                    onChange={this.onChangeNameBill}
                                  />
                                </div>
                                <div>
                                  <Input
                                    value={this.state.company}
                                    type="text"
                                    className="inner form-control mb-2"
                                    placeholder="T??n c??ng ty"
                                    onChange={this.onChangeCompanyBill}
                                  />
                                </div>
                                <div>
                                  <Input
                                    value={this.state.taxCode}
                                    type="text"
                                    className="inner form-control mb-2"
                                    placeholder="M?? s??? thu???"
                                    onChange={this.onChangeTaxCodeBill}
                                  />
                                </div>
                                <div>
                                  <Input
                                    value={this.state.address}
                                    type="text"
                                    className="inner form-control mb-2"
                                    placeholder="?????a ch???"
                                    onChange={this.onChangeAddressBill}
                                  />
                                </div>
                                <div>
                                  <Input
                                    value={this.state.email}
                                    type="text"
                                    className="inner form-control mb-2"
                                    placeholder="Email nh???n h??a ????n"
                                    onChange={this.onChangeEmailBill}
                                  />
                                </div>
                              </div>
                            )}
                            <div className="w-100">
                              <Button
                                onClick={() =>
                                  this.onPaymentButtonClick(
                                    this.props.login.userKey.key
                                  )
                                }
                                color="primary"
                                className="btn-block inner"
                                style={{ width: "100%" }}
                              >
                                {" "}
                                N???p ngay - {numberWithDots(token_money)}??
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Modal
                isOpen={
                  this.state.orderId !== null && this.state.paymentType === 4
                }
                // toggle={this.tog_standard}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0" id="myModalLabel">
                    Chuy???n kho???n th??? c??ng
                  </h5>
                  <button
                    type="button"
                    onClick={() =>
                      this.setState({ orderId: null, vnPayUrl: null })
                    }
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <div>
                      <Label>S??? t??i kho???n</Label>
                      <Input
                        readOnly
                        value="0362519215"
                        type="text"
                        className="inner form-control mb-2"
                      />
                    </div>
                    <div>
                      <Label>Ng?????i nh???n</Label>
                      <Input
                        readOnly
                        value="CTCP C??ng ngh??? v?? Truy???n th??ng AIV Group"
                        type="text"
                        className="inner form-control mb-2"
                      />
                    </div>
                    <div>
                      <Label>Chi nh??nh</Label>
                      <Input
                        readOnly
                        value="TPBank chi nh??nh ????ng ????"
                        type="text"
                        className="inner form-control mb-2"
                      />
                    </div>
                    <div>
                      <Label>S??? ti???n chuy???n kho???n</Label>
                      <Input
                        readOnly
                        value={`${numberWithDots(token_money)}??`}
                        type="text"
                        className="inner form-control mb-2"
                      />
                    </div>
                    <div>
                      <Label>N???i dung chuy???n ti???n*</Label>
                      <Input
                        readOnly
                        value={`VNALERT_[${this.state.orderId}]`}
                        type="text"
                        className="inner form-control mb-2"
                      />
                      <small>
                        {" "}
                        ????y l?? th??ng tin quan tr???ng ????? VnAlert bi???t ???????c b???n
                        ??ang mu???n n???p Token v??o t??i kho???n
                      </small>
                    </div>
                  </div>
                </div>
              </Modal>
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
)(withRouter(Payment));
