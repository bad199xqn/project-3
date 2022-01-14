import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {} from "../../store/actions";
import appstore from "../../assets/images/appstore.jpg";
import googleplay from "../../assets/images/googleplay.jpg";
import appstoreLage from "../../assets/images/AppStore.svg";
import CHPlayLage from "../../assets/images/CHPlay.svg";

// MetisMenu
import MetisMenu from "metismenujs";
import SimpleBar from "simplebar-react";
import LoginRequirementModal from "../CommonForBoth/LoginRequirementModal";
import "./verticalLayout.css";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
} from "reactstrap";
import { calcTimeDelta } from "react-countdown";

const SidebarContent = (props) => {
  return (
    <>
      {props.isLogin ? (
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="d-md-none">
              <Link to="/alert-create" className="waves-effect text-center">
                <div className="btn btn-sm btn-primary waves-effect waves-light mr-2 p-1 ">
                  <i className="fas fa-plus fa-xs text-white p-0" style={{fontSize:'0.8125rem'}}></i>

                  <span style={{fontSize:'0.8125rem', paddingRight: "5px"}}>   Theo dõi chủ đề</span>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/" className="waves-effect">
                <i className="mdi mdi-trending-up"></i>

                <span> Xu hướng</span>
              </Link>
            </li>

            <li>
              <Link to="/search" className="waves-effect">
                <i className="bx bx-search"></i>

                <span> Tìm kiếm</span>
              </Link>
            </li>

            <li>
              <Link to="/alert-management" className="waves-effect">
                <i className="bx bx-error"></i>

                <span> Chủ đề theo dõi</span>
              </Link>
            </li>

            <li>
              <Link to="/bookmark" className="waves-effect">
                <i className="bx bx-bookmark"></i>

                <span> Lưu trữ</span>
              </Link>
            </li>
          
          </ul>
        </div>
      ) : (
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/" className="waves-effect">
                <i className="mdi mdi-trending-up"></i>

                <span> Xu hướng</span>
              </Link>
            </li>

            <li>
              <Link to="/search" className="waves-effect">
                <i className="bx bx-search"></i>

                <span> Tìm kiếm</span>
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="waves-effect"
                onClick={() => props.toggleModal()}
              >
                <i className="bx bx-error"></i>

                <span> Chủ đề theo dõi</span>
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="waves-effect"
                onClick={() => props.toggleModal()}
              >
                <i className="bx bx-bookmark"></i>

                <span> Lưu trữ</span>
              </Link>
            </li>


            
          </ul>
        </div>
      )}
    </>
  );
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
    };
  }

  tog_center = () => {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
  };

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    // if (this.props.type !== "condensed" || this.props.isMobile) {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
    // }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <LoginRequirementModal
          isOpen={this.state.modal_center}
          closeModal={this.tog_center}
        />

        <div className="vertical-menu">
          <div
            data-simplebar
            className="h-100"
            style={{ position: "relative" }}
          >
            {this.props.type !== "icon" ? (
              <>
                <SimpleBar style={{ maxHeight: "100%" }}>
                  <SidebarContent
                    isLogin={this.props.login.userKey !== null ? true : false}
                    toggleModal={this.tog_center}
                  />
                </SimpleBar>
                
              </>
            ) : (
              <>
                <SidebarContent
                  isLogin={this.props.login.userKey !== null ? true : false}
                  toggleModal={this.tog_center}
                  displayStore={this.state.displayStore}
                />
                
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
    login: state.Login,
  };
};
export default connect(mapStatetoProps, {})(withRouter(Sidebar));
