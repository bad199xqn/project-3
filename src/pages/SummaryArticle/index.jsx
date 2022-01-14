import React, { Component, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Alert,
} from "reactstrap";
import axios from "axios";
/// utils
import * as utils from "../../utils/post";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
//Import Image
import img1 from "../../assets/images/companies/img-1.png";
// pk
import { useLocation } from 'react-router-dom'
import { api_v1 } from '../../services/api';
import LoginRequirementModal from '../../components/CommonForBoth/LoginRequirementModal';
import ButtonsCarousel from '../../components/CommonForBoth/SocialSharing/ButtonsCarousel';
import CopyToClipboard from 'react-copy-to-clipboard';
import SpinnerLoader from "../../assets/images/spinnerLoader.svg";

const SummaryArticle = (props) => {
//   const key = useSelector((state) => state.Login.userKey.key);
    // pk
    let location = useLocation();
    const pk = location.search.split('=')[1];
    
    const [isLoginRequirement, setIsLoginRequirement] = useState(false);
    const [linkShare, setLinkShare] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [shareLoader, setShareLoader] = useState(false);

    const [article, setArticle] = useState();

    useEffect(() => {
        var config = {
            method: 'get',
            url: `${api_v1}/articles/${pk}/?format=json`,
            headers: {
                // 'Authorization': `Token ${key}`
            }
        };

        axios(config)
            .then(({ data }) => setArticle(data))
            .catch(err => console.log(err))
    }, [pk])

    const getArticle = async (pk) => {

        const response = await axios.get('');
        const data = await response.json();
        console.log(data)

        return data;
    }

    const getShareKeywordLink = ( pk ) => {
        
        const userLogged = JSON.parse( localStorage.getItem('vnalert-state'))
        if( userLogged === null){
            setIsLoginRequirement(true);
            return
        }
        setShareLoader(true);
        

        var config = {
            method: "get",
            url: `${api_v1}/summary/${pk}/share`,
            headers: {
            // Authorization: `Token ${key}`,
            },
        };

        axios(config)
            .then((response) => {
                const link = response.data.link.replace(
                    "go.vnalert.vn/",
                    "go.vnalert.vn/out/"
                );
                setLinkShare(link)
                setIsModal(true);
                setShareLoader(false);
            })
            .catch(function (error) {
                setShareLoader(false);
                console.log(error);
            });
    } 
    const closeLoginRequirementModal = () => setIsLoginRequirement(false);
    const hideModal = () => setIsModal(false);
    const copyKeywordLinkToClipboard = () => document.getElementById("copy-to-clipboard").click();
    const onCopy = () => {
        setIsCopy(true);
        setTimeout( () => setIsCopy(false), 1500 );
    };

    return (
        <React.Fragment>
            { shareLoader && <div className="d-flex justify-content-center align-items-center position-fixed spinner-loader">
                <div style={{opacity: 1}}>
                    <img src={SpinnerLoader} />
                </div>
            </div>}
            <div className="page-content">
                <Container fluid>
                    <CopyToClipboard
                        id="copy-to-clipboard"
                        onCopy={onCopy}
                        text={linkShare}
                    >
                        <span></span>
                    </CopyToClipboard>
                    <LoginRequirementModal
                        isOpen={isLoginRequirement}
                        closeModal={closeLoginRequirementModal}
                    />
                    { !shareLoader && <ButtonsCarousel
                        copy={copyKeywordLinkToClipboard}
                        isModal={isModal}
                        url={linkShare}
                        shareText={`Tìm kiếm "${article && article.title}" trên VnAlert`}
                        hide={hideModal}
                    />}
                    { isCopy && (
                        <Alert
                            color="success"
                            className="d-flex align-items-center"
                            style={{
                            width: 240,
                            position: "fixed",
                            left: "calc(50%-120px)",
                            bottom: "20px",
                            zIndex: 99999,
                            }}
                        >
                            <i
                            className="bx bx-check-circle mr-2 font-size-16"
                            style={{ color: "#5FC490" }}
                            ></i>
                            Liên kết đã được sao chép
                        </Alert>
                    )}

                    {/* Render Breadcrumbs */}
                    <Row>
                        <Col xs="12">
                            <div className="page-title-box align-items-center justify-content-between">
                                <h4>Tóm tắt tin</h4>
                            </div>
                        </Col>
                    </Row>

                    {article && (
                        <Row>
                            <Col lg="8">

                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">
                                            Tóm tắt
                                        </CardTitle>
                                        <div className="text-left mb-4">
                                            <h5><Link to="#" className="text-dark">{article.title}</Link></h5>
                                            <p className=" mr-1">
                                                {article.source.source_name} - {utils.relativeTime(article.publish_date)}
                                            </p>
                                            <div className=" mx-auto mb-4 text-center w-100">
                                                <img src={article.feature_url} alt="" className="w-100 " />
                                            </div>
                                            <p className="font-16 text-muted mb-2"></p>

                                            <div className=" mt-4">
                                                {article.summary.split("\n").map((string) => (
                                                    <p><i className="mdi mdi-chevron-right text-primary mr-1"></i>{string}</p>
                                                ))}
                                            </div>
                                            {/* <Link to={article.href} className="text-primary font-16">Xem bài viết gốc <i className="mdi mdi-chevron-right"></i></Link> */}
                                            <div className="d-flex align-items-center justify-content-between">
                                                <a href={article.href} target="_blank" className="text-primary font-16">Xem bài viết gốc <i className="mdi mdi-chevron-right"></i></a>

                                                {/* <button
                                                    type="button"
                                                    className="btn waves-effect waves-light"
                                                    style={{ backgroundColor: "#F8F8F8" }}
                                                    onClick={() => getShareKeywordLink(article.pk)}
                                                >
                                                    Chia sẻ
                                                    <i className="fas fa-share font-size-12 align-middle ml-2"></i>
                                                </button> */}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            {/* <Col lg="4">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Tin liên quan</CardTitle>

                                        <div className="table-responsive">
                                        <Table className="table table-centered table-nowrap">
                                            <tbody>
                                                {
                                                    this.state.members.map((member) =>
                                                        <tr>
                                                            <td style={{ width: "50px" }}>
                                                                {
                                                                    member.img !== "Null"
                                                                        ? <img src={member.img} className="rounded-circle avatar-xs" alt="" />
                                                                        : <div className="avatar-xs">
                                                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                                                                                {member.name.charAt(0)}
                                                                            </span>
                                                                        </div>
                                                                }
                                                            </td>
                                                            <td><h5 className="font-size-14 m-0"><Link to="" className="text-dark">{member.name}</Link></h5></td>
                                                            <td>
                                                                <div>
                                                                    {
                                                                        member.skills.map((skill) =>
                                                                            <Link to="#" className="badge badge-primary font-size-11">{skill.name}</Link>
                                                                        )
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                    </CardBody>
                                </Card>
                            </Col> */}
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SummaryArticle;
