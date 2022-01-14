//Modal yêu cầu login để sử dụng các tính năng cho thành viên.
// isOpen: true/false - trạng thái mở/đóng modal
// closeModal(): đóng modal
import React from 'react';
import {Modal} from 'reactstrap';
import loginPopup from "../../assets/images/LoginPopup.svg";
import {Link} from "react-router-dom";
import './rightbar.scss'
const LoginRequirementModal = (props) => {
    return(
      // <div className="style-modal">
      <Modal isOpen={props.isOpen} toggle={() => props.closeModal()} centered={true}>
        <div className="modal-header" style={{ border: "none" }}>
          <button
            type="button"
            onClick={() => props.closeModal()}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-center">
            <img src={loginPopup} />
          </div>

          <div className="d-flex justify-content-center mt-4" >
              <div style={{maxWidth:400}}>
              <h5 style={{textAlign: 'center'}}>
                Hãy đăng nhập để có thể sử dụng tính năng này
            </h5>
              <h6 className="text-muted mt-2" style={{textAlign: 'center'}}>
                  Tính năng này chỉ dành cho người dùng đã có tài khoản trên ứng dụng VnAlert
              </h6>
              </div>
              </div>

          <div className="d-flex justify-content-center pt-4">
            <div className="d-flex align-items-center mr-2">
              <Link to="/register">
                {/* <i className="bx bx-home-circle"></i> */}
                <div className="d-flex justify-content-center btn btn-sm w-xs waves-effect waves-light mr-2 p-2" id="popup-dk">
                  <h6 className="" style={{margin: 0 }}>
                    Đăng ký
                  </h6>
                </div>
              </Link>
            </div>
            <div className="d-flex align-items-center">
              <Link to="/login">
                {/* <i className="bx bx-home-circle"></i> */}
                <div className="d-flex justify-content-center btn btn-sm w-xs btn-primary waves-effect waves-light mr-2 p-2 ">
                  <h6 className="" style={{ color: "#fff", margin: 0 }}>
                    Đăng nhập
                  </h6>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      // </div>
  
    )
}

export default LoginRequirementModal;