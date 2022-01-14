import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Modal } from "reactstrap";
import SocialSharingButton from "./SocialSharingButton";

import "./SocialSharing.css";

const ButtonsCarousel = (props) => {
  const isModal = props.isModal;

  const scrollLeft = (e) => {
    document.querySelector("#box-wrapper").scrollBy({
      left: -200,
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollRight = (e) => {
    document.querySelector("#box-wrapper").scrollBy({
      left: 200,
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <Modal
        id="modal"
        isOpen={props.isModal}
        //   toggle={}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0">Chia sẻ</h5>
          <button
            type="button"
            onClick={() => props.hide()}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div id="box">
            <ul id="box-wrapper">
              <li id="box-item">
                <SocialSharingButton type="Facebook" shareText={props.shareText}  url={props.url}/>
              </li>
              <li id="box-item">
                <SocialSharingButton type="Email" shareText={props.shareText} url={props.url}/>
              </li>
              <li id="box-item">
                <SocialSharingButton type="Viber" shareText={props.shareText} url={props.url}/>
              </li>
              <li id="box-item">
                <SocialSharingButton type="Telegram" shareText={props.shareText} url={props.url}/>
              </li>
              <li id="box-item">
                <SocialSharingButton type="Twitter" shareText={props.shareText} url={props.url}/>
              </li>
              <li id="box-item">
                <SocialSharingButton type="WhatsApp" shareText={props.shareText} url={props.url}/>
              </li>
              <li id="box-item">
                <SocialSharingButton type="LinkedIn" shareText={props.shareText} url={props.url}/>
              </li>
            </ul>
            <button
              class="scroll-left btn btn-circle btn-sm d-flex align-items-center justify-content-center"
              id="scroll-left"
              onClick={scrollLeft}
              style={{ backgroundColor: "lightblue" }}
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <button
              class=" scroll-right btn btn-circle btn-sm d-flex align-items-center justify-content-center"
              id="scroll-right"
              onClick={scrollRight}
              style={{ backgroundColor: "lightblue" }}
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-2 pb-2" id="copy-link">
              <p className="m-0">{props.url}</p>
              <i className="bx bx-copy font-size-16" style={{cursor:'pointer'}} onClick={() => props.copy(props.url)}></i>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ButtonsCarousel;
