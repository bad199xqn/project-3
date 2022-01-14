import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";
import empty from "../../../assets/images/empty.svg";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      userDetails: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  logout = () => {
    this.props.userLogoutRequest();
  };

  componentDidMount() {
    if (this.props.userDetails === null) {
      this.props.userDetailsRequest(this.props.login.userKey.key);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.userDetails !== null && (
          <Dropdown
            isOpen={this.state.menu}
            toggle={this.toggle}
            className="d-inline-block"
          >
            <DropdownToggle
              className="btn header-item waves-effect"
              id="page-header-user-dropdown"
              tag="button"
            >
              <img
                className="rounded-circle header-profile-user"
                src={empty}
                alt="Header Avatar"
              />
              <span className="d-none d-lg-inline-block ml-2 mr-1">
                {this.props.userDetails.last_name}{" "}
                {this.props.userDetails.first_name}
              </span>
              <i className="mdi mdi-chevron-down d-none d-lg-inline-block"></i>
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem tag="a" href="#"><i className="bx bx-user font-size-16 align-middle mr-1"></i>Profile</DropdownItem>
                        <DropdownItem tag="a" href="#"><i className="bx bx-wallet font-size-16 align-middle mr-1"></i>My Wallet</DropdownItem>
                        <DropdownItem tag="a" href="#"><span className="badge badge-success float-right">11</span><i className="mdi mdi-settings font-size-17 align-middle mr-1"></i>Settings</DropdownItem>
                        <DropdownItem tag="a" href="#"><i className="bx bx-lock-open font-size-16 align-middle mr-1"></i>Lock screen</DropdownItem>
                        <div className="dropdown-divider"></div> */}

              {/* đã chỉnh sửa modal hiển thị tên và ảnh user trên mobile */}
              <Link
                to="/userinfo"
                className="dropdown-item d-flex align-items-center d-lg-none d-inline-block"
              >
                <img
                  className="rounded-circle header-profile-user  mr-1"
                  src={empty}
                  alt="Header Avatar"
                />
                <span className="ml-2">
                  {this.props.userDetails.last_name}{" "}
                  {this.props.userDetails.first_name}
                </span>
              </Link>
              <hr style={{ margin: "8px" }} className="d-lg-none d-block" />

              <Link
                to="/userinfo"
                className="dropdown-item d-flex align-items-center"
              >
                <i className="mdi mdi-account-settings-outline font-size-16 align-middle mr-1"></i>
                <span>Tài khoản</span>
              </Link>
              <Link
                to="/"
                className="dropdown-item d-flex align-items-center"
                onClick={() => this.logout()}
              >
                <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                <span>Đăng xuất</span>
              </Link>
            </DropdownMenu>
          </Dropdown>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.UserDetails.userDetails,
    login: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailsRequest: (key) => {
      dispatch({
        type: "USER_DETAILS_REQUEST",
        payload: key,
      });
    },
    userLogoutRequest: () => {
      dispatch({
        type: "USER_LOGOUT_REQUEST",
        payload: {},
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileMenu));
