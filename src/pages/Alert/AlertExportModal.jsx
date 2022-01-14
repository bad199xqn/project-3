import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { pendingListState, exportModalState, infoAlertState} from '../../recoil/atom-export';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { api_v2 } from '../../services/api';
import { Modal, FormGroup,Label, Col, Form, Input, CustomInput } from 'reactstrap';
import Select from "react-select";


const AlertExportModal = (props) => {
  const [isOpenModal, setIsOpenModal] = useRecoilState(exportModalState);
  const infoAlert = useRecoilValue(infoAlertState);
  const [export_articles, setExport_articles] = useState(true);
  const [export_stories, setExport_stories] = useState(true)
  const [exportInterval, setExportInterval] = useState({label: "Trong 7 ngày", value:7});
  const exportIntervalOptions = [
    {label: "Trong 1 ngày", value:1},
    {label: "Trong 3 ngày", value:3},
    {label: "Trong 7 ngày", value:7},
    {label: "Trong 15 ngày", value:15},
    {label: "Trong 30 ngày", value:30},
    {label: "Trong 60 ngày", value:60},
  ]
  const key = useSelector(state => state.Login.userKey ? state.Login.userKey.key : '')
  const setNewExport = useSetRecoilState(pendingListState)

  const startExport = (pk, name, file_type, interval) => {
    const fileName = name + "." + file_type
    var data = JSON.stringify({
      "alert": pk,
      "export_type": file_type,
      "interval": interval ? interval : 30,
      "export_stories": export_stories,
      "export_articles": export_articles,
      "demo": true,
    });

    var config = {
      method: 'post',
      url: `${api_v2}/export_alert/?format=json`,
      headers: {
        'Authorization': `Token ${key}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        const data = response.data;
        setNewExport({ id: data.task_id, name: fileName, action: 'add', type: 'alert' })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    setExportInterval({label: "Trong 7 ngày", value:7})
  }, [isOpenModal])
  return (
    <>
      <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(false)}>
        <div className="modal-header">
          <div className="page-title-box align-items-center justify-content-between">
            {infoAlert.type === "pdf" ? <h4 className="modal-title mt-0" id="myModalLabel">
              Tạo báo cáo
            </h4> : <h4 className="modal-title mt-0" id="myModalLabel">
              Tạo danh sách tin
            </h4>}

            <small style={{ color: "#6B7280", fontSize: "12px" }}>
              <i>
                *Chọn khoảng thời gian lấy dữ liệu.
              </i>
            </small>
          </div>

          <button
            type="button"
            onClick={() => setIsOpenModal(false)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
         
            <FormGroup className="select2-container mb-0" row>
              <Label md="4" className="col-form-label">
                Khoảng thời gian
              </Label>
              <Col md="8">
                <Select
                  value={exportInterval}
                  onChange={(interval) => setExportInterval(interval)}
                  options={exportIntervalOptions}
                  classNamePrefix=""
                  placeholder="Chọn khoảng thời gian"
                />
              </Col>
            </FormGroup>
            {infoAlert.type === "pdf" &&
            <>
             <FormGroup className="select2-container mb-0" row>
              <Label md="4" className="col-form-label">
                Phân tích dòng tin chính
              </Label>
              <Col md="8" className='my-auto'>
                <CustomInput onChange={() => setExport_stories(!export_stories)} type='switch' name='export_stories' id='export_stories' defaultChecked={export_stories}></CustomInput>
                
              </Col>
            </FormGroup>
            <FormGroup className="select2-container" row>
              <Label md="4" className="col-form-label">
                Liệt kê tin gần đây
              </Label>
              <Col md="8" className='my-auto'>
                <CustomInput onChange={() => setExport_articles(!export_articles)} type='switch' name='export_articles' id='export_articles' defaultChecked={export_articles}></CustomInput>
              </Col>
            </FormGroup>
            </>
            }
           
  
        </div>
        <div className="modal-footer">
          <button
            type="button"
            // onClick={tog_standard}
            className="btn btn-secondary waves-effect"
            data-dismiss="modal"
          onClick={() => setIsOpenModal(false)}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              startExport(infoAlert.pk, infoAlert.name, infoAlert.type, exportInterval.value)
              setIsOpenModal(false)
            }}
          >
            Tạo
          </button>
        </div>
      </Modal>
    </>
  )
}

export default AlertExportModal;