import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import loader from "../../../assets/images/vnalert.svg";
import img3 from "../../../assets/images/empty.svg";
import * as utils from "../../../utils/post";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { SubTopicSkeleton, SubTopicSkeletonMobile } from "./SubTopicSkeleton";
import ProgressiveImage from "../../../components/CommonForBoth/ProgressiveImage";
// import LazyLoad from 'react-lazyload';
import { ReactComponent as Loading } from "../../../components/CommonForBoth/ConnectModal/images/loading.svg";
import { useVisibilityHook } from 'react-observer-api';
import { LazyLoad } from 'react-observer-api'
export const SubTopicComponent = ({ props }) => {
  const ps = useRef();

  const scrollTop = () => {
    const curr = ps.current;
    if (curr) {
      curr.scrollTop = 0;
    }
  };

  return (
    <Col lg="6" md="6">
      <Card className="shadow">
        <CardBody>
          <div className="d-flex align-items-center mb-3 ">
            <CardTitle
              className="d-flex align-items-center"
              style={{ margin: 0 }}
            >
              {props.subTopics.length > 0 && props.subTopics[0] === undefined
                ? ""
                : props.subTopics[0].display}
            </CardTitle>
            <div
              className="cursor-pointer d-flex align-items-center ml-2"
              onClick={() => {
                scrollTop();
                props
                  .getTrending(
                    props.topicTrendingKeyword.id,
                    props.subTopics[0].id
                  )
                  .then((result) => {
                    props.reSetCardTopic(
                      { subTopic: { loading: false, result: result } },
                      props.subTopics[0].id
                    );
                  });
              }}
            >
              {props.subTopic.loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-rotate-clockwise-2 rotate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#495057"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                  <line x1="5.63" y1="7.16" x2="5.63" y2="7.17" />
                  <line x1="4.06" y1="11" x2="4.06" y2="11.01" />
                  <line x1="4.63" y1="15.1" x2="4.63" y2="15.11" />
                  <line x1="7.16" y1="18.37" x2="7.16" y2="18.38" />
                  <line x1="11" y1="19.94" x2="11" y2="19.95" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-rotate-clockwise"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#495057"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
              )}
            </div>
          </div>
          {/* <div className="clearfix"></div> */}

          <Row>
            <Col lg="12" className="px-0">
              <div className="">
                <div className="table-responsive" id="trend" id="lazy">
                  <PerfectScrollbar
                    style={{ height: "400px", position: "relative" }}
                    options={{
                      suppressScrollX: true,
                      useBothWheelAxes: false,
                    }}
                    className="table-topic"
                    containerRef={(el) => (ps.current = el)}
                  >
                    {/* {props.subTopic.loading && (
                      <Table className="project-list-table table-nowrap table-borderless">
                        <tbody>
                          <SubTopicSkeleton />
                        </tbody>
                      </Table>
                    )} */}
                    <Table
                      className="project-list-table table-nowrap table-borderless"
                      style={{}}
                    >
                      <tbody>
                        {props.subTopic.loading && <SubTopicSkeleton />}

                        {props.subTopic.result.map((keyword) => {
                          const link = `/trending`;
                          return (
                            <tr className="animate-zoom animate-trend" loading="lazy">
                              <td
                                className="d-flex flex-start "
                                style={{
                                  paddingLeft: 12,
                                  paddingRight: 0,
                                  paddingTop: 0,
                                }}
                              >
                                <LazyLoad
                                scroll
                                once={true}
                                scrollContainer={'#lazy .scrollbar-container'}
                                placeholder="loading..."
                                // UnountIfInvisible={true}
                                // offset={100}
                                height={100}
                                >

                             
                                <ProgressiveImage
                                  src={
                                    !keyword.feature_image ||
                                      keyword.feature_image === ""
                                      ? img3
                                      : keyword.feature_image
                                  }
                                  alt=""
                                  className="avatar-sm-34"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = img3;
                                  }}
                                  style={{
                                    width: "64px",
                                    height: "48px",
                                    borderRadius: "0.25rem",
                                  }}
                                  placeholder={img3}
                                />
                                   </LazyLoad>
                              </td>
                              <td
                               
                                style={{
                                  paddingRight: 12,
                                  paddingTop: 0,
                                  whiteSpace: "normal",
                                  wordWrap: "break-all",
                                }}
                              >
                            
                                <Link
                                  to={{
                                    pathname: "/trending-keyword",
                                    search: `?keyword=${keyword.display_keyword}&display_keyword=${keyword.display_keyword}`,
                                  }}
                                >
                                  <p
                                    style={{
                                      // fontSize: "12px",
                                      // color: "#111C36",
                                      color: "#495057",
                                      margin: 0,
                                      fontWeight: 600,
                                    }}
                                  >
                                    {keyword.display_keyword}
                                  </p>
                                </Link>

                                <div
                                  className="d-flex justify-content-between align-items-center"
                                  style={{ marginTop: "8px" }}
                                >
                                  <div className="d-flex flex-start align-items-center">
                                    <p
                                      className="mb-0"
                                      style={{
                                        // color: "#666D7C",
                                        color: "#495057",
                                        // fontSize: "12px",
                                        // fontWeight: "400",
                                        // fontFamily: "SF Pro Text",
                                        margin: "0px 4px 0px 0px",
                                      }}
                                    >
                                      <small>
                                        {" "}
                                        Dòng tin{" "}
                                        {utils.relativeTime(
                                          keyword.publish_date
                                        )}
                                      </small>
                                    </p>
                                  </div>
                                  <div>
                                    {/* <button
                                      type="button"
                                      className="btn btn-sm waves-effect waves-light"
                                      style={{
                                        backgroundColor: "#F8F8F8",
                                      }}
                                      onClick={() =>
                                        props.getShareKeywordLink(
                                          keyword.keyword,
                                          keyword.display_keyword
                                        )
                                      }
                                    >
                                      Chia sẻ
                                      <i className="fas fa-share font-size-4 align-middle ml-2"></i>
                                    </button> */}
                                  </div>
                                </div>

                              </td>
                            </tr>
                          );
                        })}

                        {!props.subTopic.loading &&
                          !props.subTopic.result[0] && <SubTopicSkeleton />}
                      </tbody>
                    </Table>
                  </PerfectScrollbar>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export const SubTopicComponent4 = ({ props }) => {
  // const Loadings =()=>{
  //   <div>
  //     <span>đang tải ... </span>
  //   </div>
  // }
  return (
    <Col lg="6" md="6">
      <Card className="shadow">
        <CardBody>
          <div className="d-flex align-items-center mb-3">
            <CardTitle
              className="d-flex align-items-center"
              style={{ margin: 0 }}
            >
              Tin đọc nhiều
            </CardTitle>

            <div
              className="cursor-pointer d-flex align-items-center ml-2"
              onClick={() => {
                props.articleMostReadRequest(props.topicTrendingKeyword.id);
              }}
            >
              {props.articleMostRead.loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-rotate-clockwise-2 rotate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#495057"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                  <line x1="5.63" y1="7.16" x2="5.63" y2="7.17" />
                  <line x1="4.06" y1="11" x2="4.06" y2="11.01" />
                  <line x1="4.63" y1="15.1" x2="4.63" y2="15.11" />
                  <line x1="7.16" y1="18.37" x2="7.16" y2="18.38" />
                  <line x1="11" y1="19.94" x2="11" y2="19.95" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-rotate-clockwise"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#495057"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
              )}
            </div>
          </div>
          <div className="clearfix"></div>

          <Row>
            <Col lg="12" className="px-0">
              <div className="">
                <div className="table-responsive" id="trend">
                  <PerfectScrollbar
                    style={{ height: "400px", position: "relative" }}
                    options={{
                      suppressScrollX: true,
                      useBothWheelAxes: false,
                    }}
                  >
                    {/* {props.articleMostRead.loading && (
                      <Table className="project-list-table table-nowrap table-borderless">
                        <tbody>
                          <SubTopicSkeleton />
                        </tbody>
                      </Table>
                    )} */}
                    <Table
                      className="project-list-table table-nowrap table-borderless"
                      style={{}}
                    >
                      <tbody>
                        {props.articleMostRead.loading && <SubTopicSkeleton />}

                        {!props.articleMostRead.loading &&
                          props.articleMostRead.posts &&
                          props.articleMostRead.posts.map((article, index) => {

                            const link = `/trending`;
                            return (
                          
                            <tr key={index} className="animate-zoom animate-trend">
                               <td
                                 className="d-flex flex-start "
                                 style={{
                                   paddingLeft: 12,
                                   paddingRight: 0,
                                   paddingTop: 0,
                                 }}
                               >
                                     <LazyLoad
                                scroll
                                once={true}
                                scrollContainer={'#lazy .scrollbar-container'}
                                placeholder="loading..."
                             
                                height={100}
                                >
                                 <ProgressiveImage
                                   src={
                                     !article.feature_image ||
                                       article.feature_image === ""
                                       ? img3
                                       : article.feature_image
                                   }
                                   alt=""
                                   className="avatar-sm-34"
                                   onError={(e) => {
                                     e.target.onerror = null;
                                     e.target.src = img3;
                                   }}
                                   style={{
                                     width: "64px",
                                     height: "48px",
                                     borderRadius: "0.25rem",
                                   }}
                                   placeholder={img3}
                                 />
                                 </LazyLoad>
                               </td>
                               <td
                                 style={{
                                   whiteSpace: "normal",
                                   wordWrap: "break-all",
                                   paddingTop: 0,
                                   paddingRight: 12,
                                 }}
                               >
                                 <a href={article.url} target="_blank">
                                   <p
                                     style={{
                                       color: "#495057",
                                       margin: 0,
                                       fontWeight: 600,
                                     }}
                                   >
                                     {article.title}
                                   </p>
                                 </a>
                                 <div className="d-flex justify-content-between align-items-center"
                                   style={{ marginTop: "8px" }}>
                                   <div
                                     className="d-flex flex-start align-items-center"
                                   >
                                     <small className="">
                                       {utils.relativeTime(article.publish_date)}{" "}
                                       - {article.source}
                                     </small>

                                   </div>
                                   {article.summary !== null && article.summary !== '' &&
                                     <div>
                                       <Link to={`/summary-article?pk=${article.pk}`} className="" style={{ fontWeight: '600', marginRight: '2px' }} target="_blank">Xem tóm tắt <i class='bx bx-link-external font-size-12'></i></Link>
                                     </div>
                                   }
                                 </div>
                               </td>
                             </tr>
                            
                            );
                          })}
                        {!props.articleMostRead.loading &&
                          !props.articleMostRead.posts && <SubTopicSkeleton />}
                      </tbody>
                    </Table>
                  </PerfectScrollbar>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export const SubTopicComponentMobile = ({ props }) => {
  // Các card thời gian khi xem trên mobile
  props.setActiveTopic(props.activeTopic);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(false);
    // props.checkVertical.result ? setLoading(props.checkVertical)
    setLoading(props.checkVertical.loading);
  }, [props.checkVertical]);

  //chỉnh lại khi click reload tin thì tự scroll về đầu scrollbar
  const ps = useRef();

  const onScrollTop = () => {
    const curr = ps.current;

    if (curr) {
      curr.scrollTop = 0;
    }
  };

  return (
    <Row>
      <Col lg="6" md="6">
        <Card className="shadow">
          <CardBody>
            <div className="d-flex align-item-centers mb-3 vertical-topic">
              <CardTitle
                className="flex-fill align-item-centers text-center vertical-title p-1"
                style={{ margin: 0 }}
                onClick={() => {
                  setLoading(true);
                  onScrollTop();
                  props
                    .getTrending(props.topicTrendingKeyword.id, "1")
                    .then((result) =>
                      props.reSetCardTopicMobile({
                        subTopic1: { loading: false, result: result },
                        checkVertical: {
                          loading: false,
                          result: result,
                        },
                        activeTopic: 0,
                      })
                    );
                }}
              >
                {props.subTopics.length > 0 && props.subTopics[0].display}
              </CardTitle>

              <CardTitle
                className="flex-fill align-item-centers text-center vertical-title p-1"
                style={{ margin: 0 }}
                onClick={() => {
                  setLoading(true);
                  onScrollTop();
                  props
                    .getTrending(props.topicTrendingKeyword.id, "2")
                    .then((result) =>
                      props.reSetCardTopicMobile({
                        subTopic2: { loading: false, result: result },
                        checkVertical: {
                          loading: false,
                          result: result,
                        },
                        activeTopic: 1,
                      })
                    );
                }}
              >
                {props.subTopics.length > 0 && props.subTopics[1].display}
              </CardTitle>

              <CardTitle
                className="flex-fill align-item-centers text-center vertical-title p-1"
                style={{ margin: 0 }}
                onClick={() => {
                  setLoading(true);
                  onScrollTop();
                  props
                    .getTrending(props.topicTrendingKeyword.id, "3")
                    .then((result) =>
                      props.reSetCardTopicMobile({
                        subTopic3: { loading: false, result: result },
                        checkVertical: {
                          loading: false,
                          result: result,
                        },
                        activeTopic: 2,
                      })
                    );
                }}
              >
                {props.subTopics.length > 0 && props.subTopics[2].display}
              </CardTitle>

              <CardTitle
                className="flex-fill align-item-centers text-center vertical-title p-1"
                style={{ margin: 0 }}
                onClick={() => {
                  setLoading(true);
                  onScrollTop();
                  setTimeout(() => {
                    props.articleMostReadRequest(props.topicTrendingKeyword.id);
                    props.reSetCardTopicMobile({
                      checkVertical: props.articleMostRead,
                      activeTopic: 3,
                    });
                  }, 500);
                }}
              >
                Tin đọc nhiều
              </CardTitle>
            </div>
            <div className="clearfix"></div>

            {/* {getContextVerticalTopic(props.checkVertical)} */}
            <Row>
              <Col lg="12" className="px-0">
                <div className="">
                  <div className="table-responsive" id="trend">
                    <PerfectScrollbar
                      style={{ height: "400px", position: "relative" }}
                      options={{
                        suppressScrollX: true,
                        useBothWheelAxes: false,
                      }}
                      containerRef={(el) => (ps.current = el)}
                    >
                      {loading && (
                        <Table>
                          <tbody>
                            <SubTopicSkeletonMobile />
                          </tbody>
                        </Table>
                      )}
                      <Table
                        className="project-list-table table-nowrap table-borderless"
                        style={{}}
                      >
                        {props.checkVertical.result ? (
                          <tbody>
                            {!props.checkVertical.loading &&
                              props.checkVertical.result[0] &&
                              props.checkVertical.result.map((keyword) => {
                                const link = `/trending`;
                                return (
                                  // <LazyLoad 
                                  // once={true}
                                  // offset={[-100, 100]}
                                  // // scroll={true}
                                  // placeholder="Đang tải..."
                                  // >
                                  <tr className="animate-zoom animate-trend" loading="lazy">
                                    <td
                                      className="d-flex flex-start "
                                      style={{
                                        paddingLeft: 12,
                                        paddingRight: 0,
                                        paddingTop: 0,
                                      }}
                                    >
                                  
                                        <ProgressiveImage
                                          src={
                                            !keyword.feature_image ||
                                              keyword.feature_image === ""
                                              ? img3
                                              : keyword.feature_image
                                          }
                                          alt=""
                                          className="avatar-sm-34"
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = img3;
                                          }}
                                          style={{
                                            width: "64px",
                                            height: "48px",
                                            borderRadius: "0.25rem",
                                          }}
                                          placeholder={img3}
                                        />
                                
                                    </td>
                                    <td
                                      style={{
                                        paddingRight: 12,
                                        paddingTop: 0,
                                        whiteSpace: "normal",
                                        wordWrap: "break-all",
                                      }}
                                    >
                                      <Link
                                        to={{
                                          pathname: "/trending-keyword",
                                          search: `?keyword=${keyword.display_keyword}&display_keyword=${keyword.display_keyword}`,
                                        }}
                                      >
                                        <p
                                          style={{
                                            // fontSize: "12px",
                                            // color: "#111C36",
                                            color: "#495057",
                                            margin: 0,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {keyword.display_keyword}
                                        </p>
                                      </Link>

                                      <div
                                        className="d-flex justify-content-between align-items-center"
                                        style={{ marginTop: "8px" }}
                                      >
                                        <div className="d-flex flex-start align-items-center">
                                          <p
                                            className="mb-0"
                                            style={{
                                              // color: "#666D7C",
                                              color: "#495057",
                                              // fontSize: "12px",
                                              // fontWeight: "400",
                                              // fontFamily: "SF Pro Text",
                                              margin: "0px 4px 0px 0px",
                                            }}
                                          >
                                            <small>
                                              {" "}
                                              Dòng tin{" "}
                                              {utils.relativeTime(
                                                keyword.publish_date
                                              )}
                                            </small>
                                          </p>
                                        </div>
                                        <div>
                                          {/* <button
                                            type="button"
                                            className="btn btn-sm waves-effect waves-light"
                                            style={{
                                              backgroundColor: "#F8F8F8",
                                            }}
                                            onClick={() =>
                                              props.getShareKeywordLink(
                                                keyword.keyword,
                                                keyword.display_keyword
                                              )
                                            }
                                          >
                                            Chia sẻ
                                            <i className="fas fa-share font-size-4 align-middle ml-2"></i>
                                          </button> */}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  // </LazyLoad>
                                );
                              })}

                            {!props.checkVertical.loading &&
                              !props.checkVertical.result[0] && (
                                <SubTopicSkeletonMobile />
                              )}
                          </tbody>
                        ) : (
                          <tbody>
                            {!props.checkVertical.loading &&
                              props.checkVertical.posts &&
                              props.checkVertical.posts.map((article) => {
                                const link = `/trending`;
                                return (
                                  <tr className="animate-zoom animate-trend">
                                    <td
                                      className="d-flex flex-start "
                                      style={{
                                        paddingLeft: 12,
                                        paddingRight: 0,
                                        paddingTop: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      <ProgressiveImage
                                        src={
                                          !article.feature_image ||
                                            article.feature_image === ""
                                            ? img3
                                            : article.feature_image
                                        }
                                        alt=""
                                        className="avatar-sm-34"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = img3;
                                        }}
                                        style={{
                                          width: "64px",
                                          height: "48px",
                                          borderRadius: "0.25rem",
                                        }}
                                        placeholder={img3}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-all",
                                        paddingTop: 0,
                                        paddingRight: 12,
                                      }}
                                    >
                                      <a href={article.url} target="_blank">
                                        <p
                                          style={{
                                            color: "#495057",
                                            margin: 0,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {article.title}
                                        </p>
                                      </a>

                                      <div
                                        className="d-flex flex-start align-items-center"
                                        style={{ marginTop: "8px" }}
                                      >
                                        {/* <Badge
                                      style={{
                                        padding: "4px",
                                        borderRadius: "19px",
                                        backgroundColor:
                                          "rgba(19, 195, 131, 0.1)",
                                      }}
                                    >
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "#13C383",
  
                                          margin: 0,
                                        }}
                                      >
                                        +{article.read_count}
                                      </p>
                                    </Badge> */}

                                        <small className="">
                                          {utils.relativeTime(
                                            article.publish_date
                                          )}{" "}
                                          - {article.source}
                                        </small>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            {!props.checkVertical.loading &&
                              !props.checkVertical.posts && (
                                <SubTopicSkeletonMobile />
                              )}
                          </tbody>
                        )}
                      </Table>
                    </PerfectScrollbar>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

// export default SubTopicComponent
