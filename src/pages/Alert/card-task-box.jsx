import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, CardBody, Badge } from "reactstrap";

//Import Images
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";

class CardTaskBox extends Component {

    render() {
        return (
            <React.Fragment>
                <Card className="task-box">
                    <CardBody className="borad-width">
                        <div className="float-right ml-2">
                        <Badge
                      style={{
                        padding: "4px",
                        borderRadius: "19px",
                        backgroundColor: "rgba(19, 195, 131, 0.1)",
                      }}
                    >
                      <p
                        className="mb-0"
                        style={{
                          color: "#13C383",
                          // fontSize: "12px",
                          // fontWeight: "700",
                          // fontFamily: "SF Pro Text",
                          margin: 0,
                        }}
                      >
                        +666
                      </p>
                    </Badge>
                        </div>
                        <div>
                            <h5 className="font-size-15"><Link to="#" className="text-dark">{this.props.data['title']}</Link></h5>
                            <p className="text-muted mb-0">{this.props.data['date']}</p>
                        </div>

                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default CardTaskBox;