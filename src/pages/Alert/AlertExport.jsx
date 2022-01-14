import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { pendingListState, exportModalState, infoAlertState} from '../../recoil/atom-export';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { api_v2 } from '../../services/api';
import { Modal, FormGroup,Label, Col } from 'reactstrap';
import Select from "react-select";


const AlertExport = (props) => {
  const [isOpenModal, setIsOpenModal] = useRecoilState(exportModalState);
  const setInfoAlertState = useSetRecoilState(infoAlertState)

  return (
    <>
      <div onClick={() => {
        setIsOpenModal(true);
        setInfoAlertState({pk: props.pk, name: props.name, type: props.type })
      } }>
        {props.children}
      </div>
    </>
  )
}

export default AlertExport;