import AvFeedback from "availity-reactstrap-validation/lib/AvFeedback";
import AvField from "availity-reactstrap-validation/lib/AvField";
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, CardBody, Col, Row, Spinner, Toast, ToastHeader } from "reactstrap";
import { api_v1 } from "../../services/api";
// import empty from "../../assets/images/empty.svg";

const ChangePasswordComponent = (props) => {
    const [loading, setLoading] = useState(false);
    const [CPError, setCPError] = useState(false);
    const [isSucces, setIsSucces] = useState(null);

    const handleValidSubmit = (event, changeData) => {
        setLoading(true);
        var config = {
            method: "post",
            url: api_v1 + "/auth/password/change/?format=json",
            headers: {
              Authorization: `Token ${props.login.userKey.key}`,
              "Content-Type": "application/json",
            },
            data: changeData
          };
      
          axios(config)
            .then((response) => {
              console.log("res change pass: ", response);
              props.showIsChangePassword();
              setLoading(false);
              setIsSucces(true);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              setIsSucces(false);
            });
        
      }

    useEffect( () => {}, []);
    // console.log(props)
    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <Col md={8} lg={8} xl={5}>
                    <Card className="overflow-hidden">
                        <div className="bg-soft-primary">
                            <Row>
                                <Col className="col-8">
                                    <div className=" p-4">
                                        <h3 className="">
                                            ?????i m???t kh???u
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-3 cursor-pointer cpb-hover d-flex align-items-center" onClick={() => props.showIsChangePassword()}>
                            <i className='bx bx-arrow-back pr-2'></i> Quay l???i
                        </div>
                        <CardBody className="pt-0">
                            <div className="p-2">
                                <AvForm className="form-horizontal" onValidSubmit={handleValidSubmit}>
                                    <Alert
                                        color="danger"
                                        className="mb-2"
                                        isOpen={CPError}
                                        toggle={() => setCPError(!CPError)}
                                        >
                                        {`M???t kh???u kh??ng ch??nh x??c`}
                                    </Alert>
                                    <div className="form-group">
                                        <AvField
                                            value={''}
                                            name="old_password"
                                            type="password"
                                            placeholder="M???t kh???u c??"
                                            validate={{
                                                required: { value: true, errorMessage: 'Vui l??ng nh???p m???t kh???u' },
                                                // pattern: {value: props.userDetails.profile.reg_referral_code, errorMessage: 'M???t kh???u kh??ng ch??nh x??c'},
                                                pattern: {value: '^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9#@$^*_-]+)$', errorMessage: 'M???t kh???u c???n s??? d???ng 8 k?? t??? tr??? l??n c?? k???t h???p ch??? in hoa v?? ch??? s???. C?? th??? ch???a c??c k?? t??? #@$^*_-'},
                                                minLength: {value: 8, errorMessage: 'M???t kh???u c???n s??? d???ng 8 k?? t??? tr??? l??n c?? k???t h???p ch??? in hoa v?? ch??? s???'},
                                                maxLength: {value: 50, errorMessage: 'M???t kh???u c???n s??? d???ng 50 k?? t??? tr??? xu???ng c?? k???t h???p ch??? in hoa v?? ch??? s???'}
                                              }}
                                        ></AvField>
                                        {/* <AvFeedback>This is an error!</AvFeedback> */}
                                    </div>
                                    <div className="form-group">
                                        <AvField
                                            value={''}
                                            name="new_password1"
                                            type="password"
                                            placeholder="M???t kh???u m???i"
                                            validate={{
                                                required: { value: true, errorMessage: 'Vui l??ng nh???p m???t kh???u m???i' },
                                                pattern: {value: '^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9#@$^*_-]+)$', errorMessage: 'M???t kh???u c???n s??? d???ng 8 k?? t??? tr??? l??n c?? k???t h???p ch??? in hoa v?? ch??? s???. C?? th??? ch???a c??c k?? t??? #@$^*_-'},
                                                minLength: {value: 8, errorMessage: 'M???t kh???u c???n s??? d???ng 8 k?? t??? tr??? l??n c?? k???t h???p ch??? in hoa v?? ch??? s???'},
                                                maxLength: {value: 50, errorMessage: 'M???t kh???u c???n s??? d???ng 50 k?? t??? tr??? xu???ng c?? k???t h???p ch??? in hoa v?? ch??? s???'}
                                              }}
                                        ></AvField>
                                    </div>
                                    <div className="form-group">
                                        <AvField
                                            value={''}
                                            name="new_password2"
                                            type="password"
                                            placeholder="X??c nh???n m???t kh???u m???i"
                                            validate={{
                                                required: { value: true, errorMessage: 'Vui l??ng x??c nh???n m???t kh???u m???i' },
                                                match: { value: 'new_password1', errorMessage: 'M???t kh???u kh??ng kh???p'},
                                                pattern: {value: '^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9#@$^*_-]+)$', errorMessage: 'M???t kh???u c???n s??? d???ng 8 k?? t??? tr??? l??n c?? k???t h???p ch??? in hoa v?? ch??? s???. C?? th??? ch???a c??c k?? t??? #@$^*_-'},
                                                minLength: {value: 8, errorMessage: 'M???t kh???u c???n s??? d???ng 8 k?? t??? tr??? l??n c?? k???t h???p ch??? in hoa v?? ch??? s???'},
                                                maxLength: {value: 50, errorMessage: 'M???t kh???u c???n s??? d???ng 50 k?? t??? tr??? xu???ng c?? k???t h???p ch??? in hoa v?? ch??? s???'}
                                            }}
                                        ></AvField>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            className="btn btn-primary btn-block waves-effect waves-light"
                                            type="submit"
                                            disabled={loading}
                                            // onClick={() => console.log('pass da duoc thay doi')}
                                        >
                                            L??u
                                        </button>
                                    </div>
                                </AvForm>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div
                style={{
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    zIndex: 9999,
                    float: "right",
                }}
            >
                <div className="mx-2 my-2 ">
                    <Toast isOpen={loading} className="px-2 py-3 rounded">
                        <ToastHeader icon={<Spinner size="sm" />} >
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="mb-0 pr-2 pl-1" style={{marginLeft:'-1px'}}>Xin vui l??ng ?????i...</h6> 
                                </div>
                            </div>
                        </ToastHeader>
                    </Toast>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChangePasswordComponent;
