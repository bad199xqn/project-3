import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { pendingListState, successListState, listExportState, failureListState } from '../../../recoil/atom-export';
import { Label, Spinner, Toast, ToastBody, ToastHeader } from "reactstrap";
import { useInterval } from '../../../utils/useInterval';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { api_v2, api_v1 } from '../../../services/api';
import { useUnload } from '../../../utils/useUnload';

const ExportToast = (props) => {
    const [pendingList, setPendingList] = useRecoilState(pendingListState);
    const [successList, setSuccessList] = useRecoilState(successListState);
    const [failureList, setFailureList] = useRecoilState(failureListState);
    const exportList = useRecoilValue(listExportState);
    const key = useSelector(state => state.Login.userKey ? state.Login.userKey.key : '');
    const [isOpenToast, setIsOpenToast] = useState(false);

    function chunkSubstr(str, size) {
        const numChunks = Math.ceil(str.length / size)
        const chunks = new Array(numChunks)

        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size)
        }

        return chunks
    }

    const revokeExport = (id) => {
        var data = JSON.stringify({
            "task_id": id,
        });

        var config = {
            method: 'post',
            url: `${api_v2}/export_alert/revoke`,
            headers: {
                'Authorization': `Token ${key}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                const data = response.data;
                // console.log('da dung ' + id)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateAlertStatus = (id, name) => {
        var config = {
            method: 'get',
            url: `${api_v2}/export_alert/check_result?task_id=${id}`,
            headers: {
                'Authorization': `Token ${key}`,
            },
        };

        axios(config)
            .then((response) => {
                const data = response.data;
                switch (data.status) {
                    case "SUCCESS":
                        setSuccessList(id);
                        downAlertExport(id, name);
                        break;
                    case "FAILURE":
                        setFailureList(id);
                        revokeExport(id);
                        break;
                    default:
                        break;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateSearchStatus = (id, name) => {
        var config = {
            method: 'get',
            url: `${api_v1}/export_search_results/check_result?task_id=${id}`,
            headers: {
                'Authorization': `Token ${key}`,
            },
        };

        axios(config)
            .then((response) => {
                const data = response.data;
                switch (data.status) {
                    case "SUCCESS":
                        setSuccessList(id);
                        downSearchExport(id, name);
                        break;
                    case "FAILURE":
                        setFailureList(id);
                        // revokeExport(id);
                        break;
                    default:
                        break;
                }


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const downAlertExport = (id, name) => {
        var config = {
            method: 'get',
            url: `${api_v2}/export_alert/get_result?task_id=${id}`,
            headers: {
                'Authorization': `Token ${key}`,
            },
            responseType: "blob",
        };

        axios(config)
            .then((response) => {

                const fileName = name;
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.log(error);
                setFailureList(id)
            });
    };

    const downSearchExport = (id, name) => {
        var config = {
            method: 'get',
            url: `${api_v1}/export_search_results/get_result?task_id=${id}`,
            headers: {
                'Authorization': `Token ${key}`,
            },
            responseType: "blob",
        };

        axios(config)
            .then((response) => {

                const fileName = name;
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.log(error);
                setFailureList(id)
            });
    };

    const updateAlertExport = () => {
        const list = exportList.filter((item) => item.status === "PENDING" && item.type === "alert");
        list.map(item => updateAlertStatus(item.id, item.name))
    }

    const updateSearchExport = () => {
        const list = exportList.filter((item) => item.status === "PENDING" && item.type === "search");
        list.map(item => updateSearchStatus(item.id, item.name))
    }

    const delExport = (id, type) => {
        if (type === "alert") { revokeExport(id) }
        setPendingList({ action: 'remove', id: id })
    }

    useInterval(updateAlertExport, exportList.filter((item) => item.status === "PENDING" && item.type === "alert").length > 0 ? 5000 : null)
    useInterval(updateSearchExport, exportList.filter((item) => item.status === "PENDING" && item.type === "search").length > 0 ? 3000 : null)

    useMemo(() => {
        if (exportList.length > 0) {
            setIsOpenToast(true)
        }
        if (exportList.length === 0) {
            setIsOpenToast(false)
        }
    }, [exportList])

    // useEffect(() => {
    //     const list = exportList.filter((item) => item.status === "PENDING" && item.type === "alert")
    //     if (list.length > 0) {
    //         window.onbeforeunload = function(e) {
    //             e.preventDefault();
    //             var dialogText = 'Tác vụ đang được thực hiện, bạn muốn thoát ?';
    //             e.returnValue = dialogText;
    //             return list.map(item => revokeExport(item.id));
    //           };
    //     }
    // },[exportList])

    // useUnload(e => {
    //     e.preventDefault();
    //     const list = exportList.filter((item) => item.status === "PENDING" && item.type === "alert")
    //     if (list.length > 0) list.map(item => revokeExport(item.id));

    // })

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    zIndex: 9999,
                    float: "right",
                }}
            >
                {/* status.isUploading */}
                <div className="mx-2 my-2 ">
                    <Toast isOpen={isOpenToast} className="px-2 py-3 rounded">
                        {/* {alert.status === "" && search.status === "" && <ToastBody className="px-5 py-2 text-center" ><h6 className="mb-0">Xin chờ trong giây lát!</h6></ToastBody>} */}
                        {(exportList.length > 0) && exportList.map(exportItem => {
                            return (
                                <>
                                    {exportItem.status === "PENDING" && <ToastHeader icon={<Spinner size="sm" />} toggle={() => delExport(exportItem.id, exportItem.type)}><div className="d-flex align-items-center justify-content-between">
                                        <div><h6 className="mb-0 pr-2 pl-1" style={{marginLeft:'-1px'}}>Đang tạo <strong>{chunkSubstr(exportItem.name, 4)}</strong></h6> </div>
                                    </div></ToastHeader>}

                                    {exportItem.status === "SUCCESS" && <ToastHeader icon={<i className="bx bxs-check-circle font-size-20 text-success" style={{marginLeft:'-1px'}}></i>} toggle={() => delExport(exportItem.id, exportItem.type)}><div className="d-flex align-items-center justify-content-between">
                                        <div><h6 className="mb-0 pr-2">Tạo thành công <strong>{chunkSubstr(exportItem.name, 4)}</strong></h6> </div>
                                    </div></ToastHeader>}

                                    {exportItem.status === "FAILURE" && <ToastHeader icon={<i className="bx bxs-x-circle font-size-20 text-danger" style={{marginLeft:'-1px'}}></i>} toggle={() => delExport(exportItem.id, exportItem.type)}><div className="d-flex align-items-center justify-content-between">
                                        <div><h6 className="mb-0 pr-2">Tạo thất bại  <strong>{chunkSubstr(exportItem.name, 4)}</strong></h6> </div>
                                    </div></ToastHeader>}
                                </>
                            )
                        })}
                    </Toast>
                </div>
            </div>
        </>
    )
}

export default ExportToast;