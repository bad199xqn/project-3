import React, { Component } from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import { Link, withRouter, Redirect } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import megamenuImg from "../../assets/images/megamenu-img.png";
// import logo from "../../assets/images/logo.svg";
import logo from "../../assets/images/vnalert.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
import logoVnalert from "../../assets/images/Logo-vnalert-2.svg";
import vnalertIcon from "../../assets/images/Vnalert-icon.svg"

// import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      pathName: '',
      keyword: '',
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleRightbar = this.toggleRightbar.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }


  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  handleSearch = (e) => {
    if (e.key === "Enter") {
      this.props.history.push(`/search?keyword=${this.state.keyword}`);
    }
  }

  onChangeInput = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  search = () => {
    this.props.history.push(`/search?keyword=${this.state.keyword}`);
  }

  componentDidMount() {
    this.setState({
      pathName: window.location.pathname
    })

  }

  render() {

    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box" style={ window.innerWidth >= 767 ? {} : {paddingRight: 0}}>
                {/* <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="28" />
                  </span>
                  <span className="logo-lg">

                    <img src={logoVnalert} alt="" height="23"/>
                  </span>
                </Link> */}
                 <Link to="/" className="logo logo-dark d-flex justify-content-center">
                  <span className="logo-sm">
                    <img src={vnalertIcon} alt="" height="40" />
                  </span>
                  <span className="logo-lg">

                    <img src={logoVnalert} alt="" height="23"/>
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoLightSvg} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoLightPng} alt="" height="19" />
                  </span>
                </Link>
              </div>

              <button type="button" onClick={this.toggleMenu} className="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                <i className="fa fa-fw fa-bars"></i>
              </button>

                {this.state.pathName === "/" ? (
                  <form className="app-search d-none d-md-block">
                  <div className="position-relative">
                    <input type="text" className="form-control" placeholder="Tìm kiếm bài viết" onKeyDown={this.handleSearch} onChange={this.onChangeInput}/>
                    <span className="bx bx-search-alt"
                      style={{cursor:'pointer'}}
                      onClick={this.search}
                    ></span>
                  </div>
                </form>
                ) : null}

            </div>
            <div className="d-flex">
              {this.state.pathName === "/" ? (
                <div className="dropdown d-inline-block d-md-none ml-2">
                  <button onClick={() => { this.setState({ isSearch: !this.state.isSearch }); }} type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown">
                    <i className="mdi mdi-magnify"></i>
                  </button>
                  <div className={this.state.isSearch ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show" : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"}
                    aria-labelledby="page-header-search-dropdown">

                    <form className="p-3">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Tìm kiếm bài viết" aria-label="Recipient's username" onKeyDown={this.handleSearch} onChange={this.onChangeInput} />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="submit" onClick={this.search}><i className="mdi mdi-magnify"></i></button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                ) : null}
              

              {/* <LanguageDropdown /> */}


              {this.props.login.userKey && !this.props.login.loading ? (
                <>
                  <div className="d-md-flex align-items-center d-none">
                    <Link to="/alert-create" >
                      {/* <i className="bx bx-home-circle"></i> */}

                      {/* Thay đổi nút tạo cảnh báo */}
                        <div className="d-flex justify-content-center btn btn-sm w-xs btn-primary waves-effect waves-light mr-2 p-1 " style={{fontSize:'0.8125rem'}}>
                          Theo dõi chủ đề
                        </div>
                    </Link>
                  </div>

              
              {/* Giảm paddning cho NotificationDropdown trên mobile */}
              <NotificationDropdown />
              {/* Thêm tên và ảnh cho modal user trên mobile */}
              <ProfileMenu/>
                </>
                ) : (
                  <>
                   <div className="d-flex align-items-center">
                      <Link to="/login" >
                        {/* <i className="bx bx-home-circle"></i> */}
                        <div className="d-flex justify-content-center btn btn-sm w-xs btn-primary  waves-effect waves-light mr-2 p-2 " style={{fontSize:'0.8125rem'}}>
                        Đăng nhập
                        </div>
                      </Link>
                    </div>

                    <div className="d-flex align-items-center">
                      <Link to="/register" >
                        {/* <i className="bx bx-home-circle"></i> */}
                        <div className="d-flex justify-content-center btn btn-sm w-xs btn-outline-primary waves-effect waves-light mr-2 p-2 " style={{fontSize:'0.8125rem'}}>
                        Đăng ký
                        </div>
                      </Link>
                    </div>
                  </>
                )}

            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.Login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
 


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
