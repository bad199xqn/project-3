import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import * as actionTypes from './actionTypes';

import * as actions from './actions';

import axios from 'axios';
import { api_v2 } from "../../services/api";

function getApi(key) {
    let data = JSON.stringify({});

    const config = {
      method: 'get',
      url: `${api_v2}/notifications/?format=json&page=1`,
      headers: { 
        'Authorization': `Token ${key}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
   return axios(config)
    .then(function (response) {
    return(response.data)
    })
    .catch(function (error) {
        return {}
    });
};

function* fetchNotifications({payload : key}) {
    try {
        const response = yield call(getApi, key);
        yield put(actions.notificationsSuccess(response));
    } catch (error) {
        yield put(actions.notificationsError(error));
    }
}

export function* watchFetchNotifications() {
    yield takeEvery(actionTypes.NOTIFICATIONS_REQUEST, fetchNotifications)
}

function* notificationSaga() {
    yield all([
        fork(watchFetchNotifications)
    ])
}

export default notificationSaga;