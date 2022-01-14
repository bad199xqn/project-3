import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import close from './images/close.svg';
import telegram from './images/telegram.svg';
import Frame258 from './images/Frame258.svg';
import communications2 from './images/communications2.svg';
import Rectangle83 from './images/Rectangle 83.svg'
import axios from 'axios';
import { api_v1 } from '../../../services/api';

const ConnectTelegramModal = ( {isOpenModal, doneClick, userKey} ) => {
    const [modal, setModal] = useState(false);
    const [nextModal, setNextModal] = useState(0);
    const [code, setCode] = useState('');


    const getCode = (userKey) => {
      var config = {
        method: 'get',
        url: `${api_v1}/users/telegram/code`,
        headers: { 
          'Content-Type': 'application/json', 
          // 'X-Viber-Auth-Token': '4b6c57439a27def9-38a1fb7f1d7d191b-23e6a3e3cc09b12b', 
          'Authorization': `Token ${userKey}`
        }
      };
      
      axios(config)
      .then( (response) => {
        setCode(response.data.telegram_code);
        setNextModal(nextModal + 1);  
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    useEffect(() => {
      setModal(isOpenModal);
    }, [isOpenModal]);
  
    const done = () => {
      window.open(`https://t.me/VnAlert_bot`, '_blank')
      doneClick();
      // setModal(false)
      setNextModal(0);
    };
  
    const handleChange = () => {
      if (nextModal === 0) {
        return (
          <>
            <div className="modalText">
              <img src={telegram} width="122px" height="122px" alt="" />
  
              <div className="modalMain pt-3">
                <h4>Lưu ý</h4>
                <h6 class="text-muted mt-2">
                  Để tiến hành kết nối, bạn sẽ được chuyển sang ứng dụng Telegram
                </h6>
              </div>
  
              <ul
                className="modalCircle text-dark d-flex justify-content-center pl-0 mt-2"
                style={{ listStyleType: "none" }}
              >
                <li>
                  <div
                    className="mr-1"
                    style={{
                      width: 22,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#7E95F3",
                    }}
                  ></div>
                </li>
                <li>
                  <div
                    className="mr-1"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ECEDEF",
                    }}
                  ></div>
                </li>
                <li>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ECEDEF",
                    }}
                  ></div>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary mt-3 mx-auto fs-2"
              onClick={() => {
                getCode(userKey);
             
              }}
            >
              <h6 className="" style={{ color: "#fff", margin: 0 }}>
                Tiếp tục
              </h6>
            </button>
          </>
        );
      } else if (nextModal === 1) {
        return (
          <>
            <div className="modalText">
              <img src={Frame258} width="122px" height="122px" alt="" />
  
              <div className="modalMain pt-3">
                <h4>Gửi mã kết nối</h4>
                <h6 class="text-muted mt-2">
                  Sao chép mã kết nối bên dưới và dán vào ô chat trong Telegram. Sau đó
                  ấn Gửi{" "}
                </h6>
              </div>

              <div className="d-flex justify-content-center">
              <div className="p-2 mt-3 mb-3 bg-light" style={{ width: 100 }}>
                <h4 className="m-0 text-primary">{code}</h4>
              </div>
            </div>
  
              <ul
                className="modalCircle text-dark d-flex justify-content-center pl-0 mt-2"
                style={{ listStyleType: "none" }}
              >
                <li>
                  <div
                    className="mr-1"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ECEDEF",
                    }}
                  ></div>
                </li>
                <li>
                  <div
                    className="mr-1"
                    style={{
                      width: 22,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#7E95F3",
                    }}
                  ></div>
                </li>
                <li>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ECEDEF",
                    }}
                  ></div>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary mt-3 mx-auto fs-2"
              onClick={() => setNextModal(nextModal + 1)}
            >
              <h6 className="" style={{ color: "#fff", margin: 0 }}>
                Tiếp tục
              </h6>
            </button>
          </>
        );
      } else if (nextModal === 2) {
        return (
          <>
            <div className="modalText">
              <img src={communications2} width="122px" height="122px" alt="" />
  
              <div className="modalMain pt-3">
                <h4>Xác nhận</h4>
                <h6 class="text-muted mt-2">
                  Hệ thống sẽ tự động thông báo khi kết nối thành công
                </h6>
              </div>

              <div className="d-flex justify-content-center">
              <div className="p-2 mt-3 mb-3 bg-light" style={{ width: 100 }}>
                <h4 className="m-0 text-primary">{code}</h4>
              </div>
            </div>
  
              <ul
                className="modalCircle text-dark d-flex justify-content-center pl-0 mt-2"
                style={{ listStyleType: "none" }}
              >
                <li>
                  <div
                    className="mr-1"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ECEDEF",
                    }}
                  ></div>
                </li>
                <li>
                  <div
                    className="mr-1"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ECEDEF",
                    }}
                  ></div>
                </li>
                <li>
                  <div
                    style={{
                      width: 22,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#7E95F3",
                    }}
                  ></div>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary mt-3 mx-auto fs-2"
              onClick={() => done()}
            >
              <h6 className="" style={{ color: "#fff", margin: 0 }}>
                Đã hiểu
              </h6>
            </button>
          </>
        );
      }
    };
  
    return (
      <React.Fragment>
        <Modal isOpen={modal}>
          <ModalHeader className="d-flex justify-content-end " style={{border:'none'}}>
            <div className="">
              <img src={close} alt="" onClick={() => doneClick()} />
            </div>
          </ModalHeader>
  
          <ModalBody>
            <div className="modalContent text-center">{handleChange()}</div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

export default ConnectTelegramModal;
