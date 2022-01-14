import React from "react";
import {
  Badge,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
} from "reactstrap";
import * as ultils from "../../utils/post";
//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Link } from "react-router-dom";

export const BookmarkComponentOnPC = ({ props }) => {
  //   console.log(window.screen.width);
  //   console.log("inner: ", window.innerWidth);
  return (
    <div className="w-100 user-chat">
      <Card style={{ border: "none", boxShadow: "none" }}>
        <CardBody>
          <CardTitle className="mb-4 float-sm-left">
            {props.bookmarkName}
          </CardTitle>

          <div className="clearfix"></div>

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive" id="trend">
                  <PerfectScrollbar style={{ height: "450px" }}>
                    <Table
                      className="project-list-table table-nowrap table-borderless"
                      style={{}}
                    >
                      <tbody>
                        {props.bookmarkPosts &&
                          props.bookmarkPosts.map((post, key) => (
                            <tr style={{}} key={key}>
                              <td className="pt-0 pl-0 pr-0">
                                <div className="d-flex justify-content-between align-content-center">
                                  <div
                                    style={{
                                      paddingTop: 0,
                                      whiteSpace: "normal",
                                      wordWrap: "break-all",
                                    }}
                                  >
                                    <a href={post.article.href} target="_blank">
                                      <h6
                                        style={{
                                          maxWidth: "100%",
                                          display: "-webkit-box",
                                          WebkitBoxOrient: "vertical",
                                          WebkitLineClamp: 2,
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          lineHeight:1.3,
                                          color: "#495057",
                                          margin: 0,
                                        }}
                                        className="mb-2"
                                      >
                                        {post.article.title}
                                      </h6>
                                    </a>
                                  </div>
                                  <div className="mr-2">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        href="#"
                                        className="card-drop"
                                        tag="i"
                                      >
                                        <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                                      </DropdownToggle>
                                      <DropdownMenu right>
                                        {/* <DropdownItem
                                          className="d-flex align-items-center"
                                          onClick={() =>
                                            props.getShareArticleLink(
                                              post.article.pk
                                            )
                                          }
                                        >
                                          <i className="bx bx-share-alt font-size-16 mr-2"></i>
                                          Chia sẻ bài viết
                                        </DropdownItem> */}
                                        {/* {post.article.summary !== null && post.article.summary !== '' &&
                                          <DropdownItem
                                            className="d-flex align-items-center"
                                            onClick={() =>
                                              props.getSummaryLink(
                                                post.article.pk
                                              )
                                            }
                                          >
                                            <i className="bx bx-share-alt font-size-16 mr-2"></i>
                                            Chia sẻ tin tóm tắt
                                          </DropdownItem>
                                        } */}
                                        <DropdownItem
                                          className="d-flex align-items-center"
                                          onClick={() =>
                                            props.copyArticleLink(
                                              post.article.href,
                                              post.article.title,
                                              post.feature_url
                                            )
                                          }
                                        >
                                          <i className="bx bx-link font-size-16 mr-2"></i>
                                          Sao chép liên kết
                                        </DropdownItem>
                                        <DropdownItem
                                          className="d-flex align-items-center"
                                          onClick={() =>
                                            props.mentionUnsetBookmark(
                                              post.pk,
                                              post.bookmarks[0],
                                              props.userBookmarksRequest,
                                              props.login.userKey.key
                                            )
                                          }
                                        >
                                          <i className="bx bx-trash font-size-16 mr-2"></i>
                                          Bỏ lưu bài viết
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
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
                                    {post.article.description}
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
                                    <img
                                      src={ultils.iconSource(
                                        post.article.source_type[0]
                                      )}
                                      alt=""
                                      height="14"
                                      className="mr-1"
                                    />{" "}
                                    <small>
                                      {" "}
                                      {ultils.relativeTime(
                                        post.article.publish_date
                                      )}{" "}
                                      - {post.article.source}
                                    </small>
                                  </p>
                                </div>
                                <div className="d-flex flex-row justify-content-between mt-2">
                                  <Badge
                                    className={`font-size-12 p-1 mr-2 badge-soft-${ultils.sentimentalityColor(
                                      post.sentimentality
                                    )}`}
                                    color={ultils.sentimentalityColor(post.sentimentality)}
                                    style={{
                                      borderRadius: "4px",
                                    }}
                                    pill
                                  >
                                    {ultils.sentimentalityText(
                                      post.sentimentality
                                    )}
                                  </Badge>
                                  {post.article.summary !== null && post.article.summar !== '' &&
                                    <Link
                                      to={`/summary-article?pk=${post.article.pk}`}
                                      className="mr-2"
                                      style={{ fontWeight: '600', marginRight: '2px' }}
                                      target="_blank"
                                    >
                                      Xem tóm tắt <i class='bx bx-link-external font-size-12'></i>
                                    </Link>
                                  }
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
                  </PerfectScrollbar>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export const BookmarkComponentOnMobile = ({ props }) => {
  return (
    <div
      className={props.isShow ? "w-100 user-chat" : "w-100 user-chat d-none"}
    >
      <Card style={{ border: "none", boxShadow: "none" }}>
        <CardBody>
          <CardTitle className="mb-4 float-sm-left">
            <i
              className="fas fa-chevron-left fa-sm text-black-50"
              style={{ marginRight: "8px" }}
              onClick={() => props.isHide(false)}
            ></i>{" "}
            {props.bookmarkName}
          </CardTitle>

          <div className="clearfix"></div>

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive" id="trend">
                  <PerfectScrollbar style={{ height: "450px" }}>
                    <Table
                      className="project-list-table table-nowrap table-borderless"
                      style={{}}
                    >
                      <tbody>
                        {props.bookmarkPosts &&
                          props.bookmarkPosts.map((post, key) => (
                            <tr style={{}} key={key}>
                              <td className="pt-0 pl-0 pr-0">
                                <div className="d-flex justify-content-between align-content-center">
                                  <div
                                    style={{
                                      paddingTop: 0,
                                      whiteSpace: "normal",
                                      wordWrap: "break-all",
                                    }}
                                  >
                                    <a href={post.article.href} target="_blank">
                                      <h6
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
                                        className="mb-2"
                                      >
                                        {post.article.title}
                                      </h6>
                                    </a>
                                  </div>
                                  <div className="mr-2">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        href="#"
                                        className="card-drop"
                                        tag="i"
                                      >
                                        <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                                      </DropdownToggle>
                                      <DropdownMenu right>
                                        {/* <DropdownItem
                                          className="d-flex align-items-center"
                                          onClick={() =>
                                            props.getShareArticleLink(
                                              post.article.pk
                                            )
                                          }
                                        >
                                          <i className="bx bx-share-alt font-size-16 mr-2"></i>
                                          Chia sẻ bài viết
                                        </DropdownItem> */}
                                        {post.article.summary !== null && post.article.summary !== '' &&
                                          <DropdownItem
                                            className="d-flex align-items-center"
                                            onClick={() =>
                                              props.getSummaryLink(
                                                post.article.pk
                                              )
                                            }
                                          >
                                            <i className="bx bx-share-alt font-size-16 mr-2"></i>
                                            Chia sẻ tin tóm tắt
                                          </DropdownItem>
                                        }
                                        <DropdownItem
                                          className="d-flex align-items-center"
                                          onClick={() =>
                                            props.copyArticleLink(
                                              post.article.href,
                                              post.article.title,
                                              post.feature_url
                                            )
                                          }
                                        >
                                          <i className="bx bx-link font-size-16 mr-2"></i>
                                          Sao chép liên kết
                                        </DropdownItem>
                                        <DropdownItem
                                          className="d-flex align-items-center"
                                          onClick={() =>
                                            props.mentionUnsetBookmark(
                                              post.pk,
                                              post.bookmarks[0],
                                              props.userBookmarksRequest,
                                              props.login.userKey.key
                                            )
                                          }
                                        >
                                          <i className="bx bx-trash font-size-16 mr-2"></i>
                                          Bỏ lưu bài viết
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
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
                                    {post.article.description}
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
                                    <img
                                      src={ultils.iconSource(
                                        post.article.source_type[0]
                                      )}
                                      alt=""
                                      height="14"
                                      className="mr-1"
                                    />{" "}
                                    <small>
                                      {" "}
                                      {ultils.relativeTime(
                                        post.article.publish_date
                                      )}{" "}
                                      - {post.article.source}
                                    </small>
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between flex-row mt-2">
                                  <Badge
                                    className={`font-size-12 p-1 mr-2 badge-soft-${ultils.sentimentalityColor(
                                      post.sentimentality
                                    )}`}
                                    color={ultils.sentimentalityColor(post.sentimentality)}
                                    style={{
                                      borderRadius: "4px",
                                    }}
                                    pill
                                  >
                                    {ultils.sentimentalityText(
                                      post.sentimentality
                                    )}
                                  </Badge>
                                  {post.article.summary !== null && post.article.summar !== '' &&
                                    <Link
                                      to={`/summary-article?pk=${post.article.pk}`}
                                      className="mr-2"
                                      style={{ fontWeight: '600', marginRight: '2px' }}
                                      target="_blank"
                                    >
                                      Xem tóm tắt <i class='bx bx-link-external font-size-12'></i>
                                    </Link>
                                  }
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
                  </PerfectScrollbar>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
