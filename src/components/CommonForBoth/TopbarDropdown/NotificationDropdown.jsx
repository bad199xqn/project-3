import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import {connect} from 'react-redux';
import * as ultils from '../../../utils/post';
import { Redirect } from 'react-router'
import { api_v1, api_v2 } from "../../../services/api";
import NotificationStatus from "./notificationStatus";
//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import './style.scss'
class NotificationDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      newNotificationsData: [],
      redirect: false,
      otification:[]
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }

  ringTheBell = (data) => {
    const stringData = JSON.stringify(data);
    if (stringData.search(`"being_opened":false`) === -1 ) {
      return false;
    }
    else return true;
  }

  componentDidMount() {
    if (window.location.pathname === "/") {
      this.props.notificationsRequest(this.props.login.userKey.key)
    }

  }
  notificationStatus = (pk) => {
  var axios = require('axios');
  var data = JSON.stringify({
    being_opened: true,
    // being_opened: false,

  });
  var config = {
    method: 'patch',
    url: `${api_v1}/notifications/${pk.pk}/?format=json&page=1 `,
    headers: { 
      Authorization: `Token ${this.props.login.userKey.key}`, 
      'Content-Type': 'application/json'
    },
    data : data
    
  };
  
  axios(config)
  .then((response) => {
    const newData = (this.state.newNotificationsData.length === 0 ? this.props.notificationsData.results : this.state.newNotificationsData).map(item =>{
      if(pk.pk === item.pk){
        return {...item,being_opened:!item.being_opened}
      }
      return item
    })
    console.log(newData)
    this.props.notificationsRequest(this.props.login.userKey.key)
    this.setState({
      newNotificationsData: newData,
      redirect: true,
    })
  })
  .catch(function (error) {
    console.log(error);
  });
 
  }
  ///
  notificationStatusAll(){ 
    this.props.notificationsData.results.map( item => {
      if(!item.being_opened){
        // console.log("a")
        this.notificationStatus(item)
      }
      console.log("b")
    })
  }
  render() {
    
    //dùng window.innerWidth kiểm tra width màn hình sau đó chỉnh lại style cho DropdownToggle
    const dropdownToggle = this.ringTheBell(this.props.notificationsData) ?
    <DropdownToggle
      className="btn header-item noti-icon waves-effect" style={ window.innerWidth >= 767 ? {} : {paddingRight: "12px", paddingLeft: "12px"} }
      tag="button" id="page-header-notifications-dropdown"
    >
      <i className="bx bx-bell bx-tada"></i>
      <span className="badge badge-danger badge-pill">!</span>
    </DropdownToggle>
    :
    <DropdownToggle
      className="btn header-item noti-icon waves-effect" style={ window.innerWidth >= 767 ? {} : {paddingRight: "12px", paddingLeft: "12px"} }
      tag="button" id="page-header-notifications-dropdown"
    >
      <i className="bx bx-bell"></i>
    </DropdownToggle>


const notificationsList = this.props.notificationsData.results ? 
((this.state.newNotificationsData.length === 0 ? this.props.notificationsData.results : this.state.newNotificationsData).map((notification) =>  {
  const soures = notification.mentions.map((mention, index) =>  {if(index <= 5) return `${mention.source_name}, `})
  return  notification.being_opened ?(
    <Link 
    // onClick={()=>this.notificationStatus(notification.pk)}

  to={{
    pathname: "/alert-detail",
    search: `?displayKeyword=${notification.alert_name}`,
    state: {
      alertPk: notification.alert,
      publicToken: null
    }
  }}
  className="text-reset notification-item">
  <div className="media ">
    <div className="media-body">
      <h6 className="mt-0 mb-1">{`"${notification.alert_name}" có ${notification.count} bài viết mới`}</h6>
      <div className="font-size-12 text-muted">
        <p className="mb-1">Có {notification.count} đề cập mới từ {soures}</p>
        <p className="mb-0"><i className="mdi mdi-clock-outline mr-1"></i>{ultils.publishDate(notification.date)}</p>
      </div>
    </div>
  </div>
  </Link>
  ):(
    <>
    <NotificationStatus notification={notification} notificationStatus={this.notificationStatus} key={`${this.props.login.userKey.key}`} />

    </>
  ) 
}))
: null

    return (
      <React.Fragment>

        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="dropdown d-inline-block"
          tag="li"
        >

      {dropdownToggle}
          <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0" right>
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0"> Thông báo </h6>
                </Col>
                <div className="col-auto">
                  <button style={{border:'none'}} className="small bg-white text-primary"
                      onClick={()=> this.notificationStatusAll()}

                  > Đã xem tất cả </button>
                </div>
              </Row>
            </div>

            <SimpleBar style={{ height: "230px" }}>
            {notificationsList}
            </SimpleBar>
            {/* <div className="p-2 border-top">
              <Link
                className="btn btn-sm btn-link font-size-14 btn-block text-center"
                to="#"
              >
                {" "}
                View all{" "}
              </Link>
            </div> */}
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.Login,
    notificationsData: state.Notifications.notificationsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notificationsRequest: (key) => {
      dispatch({
        type: 'NOTIFICATIONS_REQUEST',
        payload: key
      })
    },


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDropdown);

