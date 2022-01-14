//popup lưu trữ báo cáo
// các props {
//     hide: hàm ẩn BookmarkPopup,
//     show: hàm hiện BookmarkPopup,
//     mentionPk: pk của mention cần bookmark,
//     articlePk: pk của mention cần bookmark,
//     type: bookmark "article" hoặc "mention",
// }

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
  Alert,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { api_v1 } from "../../services/api";
import SpinnerLoader from "../../assets/images/spinnerLoader.svg";
class BookmarkPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmark: { label: "Chọn nhóm lưu trữ", value: null },
      error: false,
      loading: false,
      status: null,
    };
  }

  //Chuyển data get về dạng data cho component Select
  getBookmarks = (userBookmarks) => {
    let bookmarks = [];
    userBookmarks.map((bookmark) => {
      bookmarks = [...bookmarks, { label: bookmark.name, value: bookmark.pk }];
    });
    return [{ options: bookmarks }];
  };

  //Chọn bookmark
  handleSelectBookmark = (bookmark) => {
    this.setState({ bookmark });
  };

  //Set bookmark cho mention
  mentionSetBookmark = (key, mentionPk, bookmarkPk) => {
    this.setState({ loading: true, })
    const config = {
      method: "put",
      url: `${api_v1}/mentions/${mentionPk}/bookmark/?format=json`,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: {
        bookmark_pk: bookmarkPk,
      },
    };

    axios(config)
      .then((response) => {
        this.props.hide();
        this.setState({ 
          loading: false, 
          status: true, 
          bookmark: { label: "Chọn nhóm lưu trữ", value: null },
        })
      })
      .catch((error) => {
        this.setState({
          error: false,
          loading: false,
          status: false,
          bookmark: { label: "Chọn nhóm lưu trữ", value: null },
        });
      });
  };

  //Set bookmark cho article
  articleSetBookmark = (key, articlePk, bookmarkPk) => {
    this.setState({ loading: true, })
    const config = {
      method: "put",
      url: `${api_v1}/articles/${articlePk}/bookmark/?format=json`,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      data: {
        bookmark_pk: bookmarkPk,
      },
    };

    axios(config)
      .then((response) => {
        this.setState({ 
          loading: false, 
          status: true, 
          bookmark: { label: "Chọn nhóm lưu trữ", value: null },
        })
      })
      .catch((error) => {
        this.setState({ 
          loading: false, 
          status: false, 
          bookmark: { label: "Chọn nhóm lưu trữ", value: null },
        })

        // this.setState({
        //     error: true
        // })
      });
  };

  //Lưu vào bookmark
  setBookmark = (type, key, mentionPk, articlePk, bookmarkPk) => {
    this.props.hide();
    switch (type) {
      case "mention":
        this.mentionSetBookmark(key, mentionPk, bookmarkPk);
        break;
      case "article":
        this.articleSetBookmark(key, articlePk, bookmarkPk);
      default:
        break;
    }
  };

  componentDidMount() {
    //nếu chưa có bookmarks data thì gọi yêu cầu
    if (!this.props.userBookmarks.results && this.props.login.userKey !== null) {
      this.props.userBookmarksRequest(this.props.login.userKey.key);
    }
  }

  render() {
    if(this.state.status !== null) {
      setTimeout(() => {
        this.setState({ status: null, });
      }, 3000);
    }
    const { bookmark } = this.state;
    const bookmarks = this.props.userBookmarks.results
      ? [...this.getBookmarks(this.props.userBookmarks.results)]
      : [];
    return (
      <>
      { this.state.loading && <div style={{top: 0}} className="d-flex justify-content-center align-items-center position-fixed spinner-loader">
          <div style={{opacity: 1}}>
          <img src={SpinnerLoader} />
          </div>
        </div>}
        {this.state.status !== null && (
              <Alert
                color={this.state.status ? "success" : "danger"}
                className="d-flex align-items-center"
                style={{
                  width: 240,
                  position: "fixed",
                  left: "calc(50%-120px)",
                  bottom: "20px",
                  zIndex: 99999,
                }}
              >
                {this.state.status ? 
                <><i
                  className="bx bx-check-circle mr-2 font-size-16"
                  style={{ color: "#5FC490" }}
                ></i>Lưu trữ thành công</> : 
                <><i className="far fa-times-circle mr-2 font-size-16"></i>Lưu trữ thất bại
                </>}
              </Alert>
            )}
      <Modal isOpen={this.props.isOpen} toggle={() => this.props.hide()}>
        <div className="modal-header">
          <div className="page-title-box align-items-center justify-content-between">
            <h4 className="modal-title mt-0" id="myModalLabel">
              Lưu trữ bài viết
            </h4>
            <small style={{ color: "#6B7280", fontSize: "12px" }}>
              <i>
                *Lưu trữ những bài viết thành những nhóm cho riêng bạn.
              </i>
            </small>
          </div>

          <button
            type="button"
            onClick={() => this.props.hide()}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {!this.state.error ? (
            <FormGroup className="select2-container mb-4" row>
              <Label md="3" className="col-form-label">
                Nhóm lưu trữ
              </Label>
              <Col md="9">
                <Select
                  value={bookmark}
                  onChange={this.handleSelectBookmark}
                  options={bookmarks}
                  classNamePrefix=""
                  placeholder="Chọn nhóm lưu trữ"
                />
              </Col>
            </FormGroup>
          ) : (
            <div className="d-flex justify-content-center my-4">
              <h6>Lưu trữ không thành công</h6>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            // onClick={this.tog_standard}
            className="btn btn-secondary waves-effect"
            data-dismiss="modal"
            onClick={() => this.props.hide()}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() =>
              this.setBookmark(
                this.props.type,
                this.props.login.userKey.key,
                this.props.mentionPk,
                this.props.articlePk,
                this.state.bookmark.value
              )
            }
          >
            Lưu
          </button>
        </div>
      </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.Login,
    userBookmarks: state.UserBookmarks.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userBookmarksRequest: (key) => {
      dispatch({
        type: "USER_BOOKMARKS_REQUEST",
        payload: key,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkPopup);
