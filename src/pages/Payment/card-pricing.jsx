import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Media } from "reactstrap";

class CardPricing extends Component {
  render() {
    return (
      <React.Fragment>
        <Card className="plan-box h-100 ">
          <CardBody className="p-4 pb-0">
            <Media>
              <Media body>
                <h5>{this.props.pricing.title}</h5>
                <p className="text-muted">{this.props.pricing.description}</p>
                {/* {this.props.pricing.description === "Gói tiêu chuẩn" && <p className="text-muted"></p>} */}
              </Media>
              {/* <div className="ml-3">
                                    <i className={"bx " + this.props.pricing.icon + " h1 text-primary"}></i>
                                </div> */}
            </Media>
            <div className="py-4 d-flex justify-content-center border-bottom">
              {this.props.pricing.price !== "" && (
                <h2>
                  {this.props.pricing.price}
                  <sup>
                    <small>.000đ</small>
                  </sup>
                  /{" "}
                  <span className="font-size-13">
                    {this.props.pricing.duration}
                  </span>
                </h2>
              )}
              {this.props.pricing.price === "" && <h2>Liên hệ ngay</h2>}
            </div>
      

            <div className="plan-features mt-4">
              {this.props.pricing.special_features && (
                <div>
                    <h6 className="text-warning"> <i className="fa fa-star mr-2 mb-2"></i>Hỗ trợ đặc biệt</h6>
                  {this.props.pricing.special_features.map((feature, key) => (
                    <p key={"_feature_" + key}>
                      <i className="fa fa-check text-success mr-2"></i>{" "}
                      {feature.title}
                    </p>
                  ))}
                </div>
              )}
<h6 className="mb-3">Chi tiết gói {this.props.pricing.title}</h6>
              {this.props.pricing.features.map((feature, key) => (
                <p key={"_feature_" + key}>
                  <i className="fa fa-check text-success mr-2"></i>{" "}
                  {feature.title}
                </p>
              ))}
            </div>
       
          </CardBody>
          <div className="text-center mb-4  " style={{marginTop:'-1.4rem'}}>
              <Link
                to={{
                  pathname: this.props.pricing.price === "" ? "" : "/payment",
                  // search: `?displayKeyword=${alert.name}`,
                  state: {
                    plan: this.props.pricing.title,
                    price: this.props.pricing.price,
                  },
                }}
                className="btn btn-primary btn-sm waves-effect waves-light px-4 py-2"
              >
                {this.props.pricing.call_action}
              </Link>
            </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default CardPricing;
