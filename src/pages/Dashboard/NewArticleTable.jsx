import React, { Component, lazy } from "react";
import { Link } from "react-router-dom";
import {
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Label,
  Input,
  Alert,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";
import moment from "moment";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PerfectScrollbar from "react-perfect-scrollbar";
import loader from "../../assets/images/vnalert.svg";
import { getShortLink, copyToClipboard } from "../../utils/shortLink";
import { NewArticleTableSkeleton } from "./NewArticleTableSkeleton";
// import NewArticleTable from "./DetailsArticleTable";

const BookmarkPopup = lazy(()=> import("../../components/CommonForBoth/BookmarkPopup"));

class NewArticleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
      articlePk: null,
    };
    this.sentimentalityText = this.sentimentalityText.bind(this);
    this.relativeTime = this.relativeTime.bind(this);
    this.sentimentalityColor = this.sentimentalityColor.bind(this);
  }

  sentimentalityText = (sentimentality) => {
    if (sentimentality == 1) return "Tích cực";
    if (sentimentality == 2) return "Tiêu cực";
    if (sentimentality == 3) return "Trung tính";
    if (sentimentality == 4) return "Trung tính";
    if (sentimentality == 0) return "Trung tính";
  };

  sentimentalityColor = (sentimentality) => {
    if (sentimentality == 1) return "success";
    if (sentimentality == 2) return "danger";
    if (sentimentality == 3) return "secondary";
    if (sentimentality == 4) return "secondary";
    if (sentimentality == 0) return "secondary";
  };

  relativeTime = (time) => {
    const now = moment();
    const pub_date = moment(time);
    const minutes_coutn = now.diff(pub_date, "minutes");
    const hours_coutn = now.diff(pub_date, "hours");
    const days_count = now.diff(pub_date, "days");

    if (minutes_coutn < 60) {
      return minutes_coutn + " phút trước";
    } else {
      if (hours_coutn < 24) {
        return hours_coutn + " giờ trước";
      } else {
        return days_count + " ngày trước";
      }
    }
  };

  getShareLink = (url, title, feature_url) => {
    getShortLink(url, title, feature_url).then((link) => {
      this.setState(
        {
          link: link,
          isCopy: true,
        },
        () => {
          console.log(this.state.link);
          copyToClipboard(this.state.link);
          setTimeout(
            () =>
              this.setState({
                isCopy: false,
              }),
            1500
          );
        }
      );
    });
  };

  paginationClick = (page) => {
    this.props.paginationClick(page);
  };

  hidePopup = () => {
    this.setState({ openPopup: false });
  };

  showPopup = () => {
    this.setState({ openPopup: true });
  };

  render() {
    const pages = [1, 2, 3, 4, 5, 6];
    const textStyle = {
      maxWidth: "100%",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",

      color: "#495057",
      margin: 0,
      fontWeight: 600,
    };

    return (
      <React.Fragment>
        <div id="new-article-table"></div>
        {this.state.isCopy && (
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
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {/* <CardTitle className="mb-4 float-sm-left">
                  {this.props.tableTitle}
                </CardTitle> */}
                <div className="clearfix"></div>

                <Row>
                  <Col lg="12">
                    <div className="table-responsive">
                      {this.props.isLoading && (
                        <PerfectScrollbar style={{ height: "400px" }}>
                          <Table className="table-centered table-nowrap">
                            <thead>
                              <tr>
                                <th>Thời gian</th>
                                <th>Tiêu đề</th>
                                <th>Nguồn tin</th>
                                <th>Sắc thái</th>
                                <th>Thời gian xuất bản</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody style={{ position: "relative" }}>
                              {this.props.isLoading && (
                                <NewArticleTableSkeleton />
                              )}
                            </tbody>
                          </Table>
                        </PerfectScrollbar>
                      )}
                      {!this.props.isLoading && (
                        <PerfectScrollbar style={{ height: "900px" }}>
                          <Table className="table-centered table-nowrap">
                            <thead>
                              <tr>
                                <th>Thời gian</th>
                                <th>Tiêu đề</th>
                                <th>Sắc thái</th>
                                <th>Nguồn tin</th>

                                <th>Thời gian xuất bản</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody style={{ position: "relative" }}>
                              {/* {this.props.isLoading && (
                             <div
                               style={{
                                 position: "absolute",
                                 top: "50%",
                                 left: "calc(50% - 30px)",
                               }}
                             >
                               <span className="logo-sm loader">
                                 <img src={loader} alt="" height="60" />
                               </span>
                             </div>
                           )} */}
                              {this.props.list &&
                                this.props.list.map((article, key) => {
                                  const pub_date = moment(article.publish_date);
                                  const publish_date =
                                    pub_date.format("HH:mm") +
                                    " " +
                                    pub_date.format("DD-MM-YYYY");

                                  const relative_time = this.relativeTime(
                                    article.publish_date
                                  );
                                  return (
                                    <tr>
                                      <td>{relative_time}</td>
                                      <td
                                        style={{
                                          whiteSpace: "normal",
                                          wordWrap: "break-all",
                                          maxWidth: "30vw",
                                        }}
                                      >
                                        <div id={"pk-" + article.pk}>
                                          <a
                                            style={textStyle}
                                            href={article.href}
                                            target="_blank"
                                          >
                                            {article.title}
                                          </a>
                                        </div>
                                        <UncontrolledTooltip
                                          placement="top"
                                          target={"pk-" + article.pk}
                                        >
                                          {article.title}
                                        </UncontrolledTooltip>
                                      </td>

                                      <td>
                                        <Badge
                                          className={
                                            "font-size-12 mr-2 p-1 badge-soft-" +
                                            `${this.sentimentalityColor(
                                              article.sentimentality[0]
                                            )}`
                                          }
                                          style={{ borderRadius: "4px" }}
                                          pill
                                          color={this.sentimentalityColor(
                                            article.sentimentality[0]
                                          )}
                                        >
                                          {this.sentimentalityText(
                                            article.sentimentality[0]
                                          )}
                                        </Badge>
                                      </td>

                                      <td>
                                        {article.source !== null && (
                                          <div style={{ maxWidth: "10vw" }}>
                                            {" "}
                                            <p className="text-truncate m-0">
                                              <Link
                                                to={`/details/?news=${article.source.pk}`}
                                                className="text-dark"
                                              >
                                                {article.source.source_name}
                                              </Link>
                                            </p>
                                          </div>
                                        )}
                                      </td>

                                      <td>{publish_date}</td>
                                      <td>
                                        <UncontrolledDropdown>
                                          <DropdownToggle
                                            href="#"
                                            className="card-drop"
                                            tag="i"
                                          >
                                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                          </DropdownToggle>
                                          <DropdownMenu right>
                                            {article.summary !== null && article.summary !== "" && 
                                            <>
                                            <Link to={`/summary-article?pk=${article.pk}`} className target="_blank">
                                                <DropdownItem
                                                  className="d-flex align-items-center"
                                                >
                                                  <i class='bx bx-link-external font-size-16 mr-2'></i>
                                                  Xem tóm tắt
                                                </DropdownItem>
                                              </Link>
                                              {/* <DropdownItem
                                              className="d-flex align-items-center"
                                              onClick={() =>
                                                this.props.getShareSummaryLink(article.pk)
                                              }
                                            >
                                              <i className="bx bx-share-alt font-size-16 mr-2"></i>
                                              Chia sẻ tin tóm tắt
                                            </DropdownItem> */}
                                            </>
                                            }
                                            <DropdownItem
                                              className="d-flex align-items-center"
                                              onClick={() =>
                                                this.setState({
                                                  openPopup: true,
                                                  articlePk: article.pk,
                                                })
                                              }
                                            >
                                              <i className="bx bx-bookmark font-size-16 mr-2"></i>
                                              Lưu trữ bài viết
                                            </DropdownItem>
                                            <DropdownItem
                                              className="d-flex align-items-center"
                                              onClick={() =>
                                                this.getShareLink(
                                                  article.href,
                                                  article.title,
                                                  article.feature_url
                                                )
                                              }
                                            >
                                              <i className="bx bx-link font-size-16 mr-2"></i>
                                              Sao chép liên kết
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </PerfectScrollbar>
                      )}
                    </div>
                  </Col>
                </Row>

                <nav aria-label="...">
                  <ul className="pagination justify-content-center mt-3 mb-0">
                    {pages.map((page) => {
                      return this.props.page === page ? (
                        <li className="page-item active ml-1 mr-1">
                          <Link
                            style={{ width: "34px", borderRadius: "50%" }}
                            className="page-link justify-content-center d-flex"
                            onClick={() => this.paginationClick(page)}
                          >
                            {page} <span className="sr-only">(current)</span>
                          </Link>
                        </li>
                      ) : (
                        <li className="page-item ml-1 mr-1">
                          <Link
                            style={{ width: "34px", borderRadius: "50%" }}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.state.openPopup && 
                <BookmarkPopup
                isOpen={this.state.openPopup}
                hide={this.hidePopup}
                show={this.showPopup}
                type="article"
                articlePk={this.state.articlePk}
              />
        }

      </React.Fragment>
    );
  }
}

export default NewArticleTable;
