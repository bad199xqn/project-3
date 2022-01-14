import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {loadSate, saveState} from "../../localStorage";

import axios from 'axios';
import { api_v1, api_v2 } from '../../../services/api';

function getUserLoginApi(loginInfo) {
    let data = loginInfo.email ? JSON.stringify(loginInfo) : loginInfo;
    const url = loginInfo.email ? `${api_v1}/auth/login/?format=json` : `${api_v2}/auth/social_login/?format=json`
    const config = {
      method: 'post',
      url: url,
      headers: { 
        'Authorization': 'bd2b3947659b5fba699ebbf8429877ab726570ee', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
   return axios(config)
    .then(function (response) {
    return(response.data)
    })
    .catch(function (error) {
      return(error);

    });
};

// function postUserLogoutApi(key) {
 
//     const url = `https://api.vnalert.vn/v1/auth/logout/?format=json`
//     const config = {
//       method: 'post',
//       url: url,
//       headers: { 
//         'Authorization': `Token ${key}`, 
//         'Content-Type': 'application/json'
//       },
//       data : {}
//     };
    
//    return axios(config)
//     .then(function (response) {
//     return(response.data)
//     })
//     .catch(function (error) {

//     });
// };

function getUserDetailsApi(key) {
    let data = JSON.stringify({});
    const config = {
      method: 'get',
      url: `${api_v1}/users/?format=json`,
      headers: { 
        'Authorization': `Token ${key}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
   return axios(config)
    .then(function (response) {
    return(response.data.results[0])
    })
    .catch(function (error) {
      return null;

    });
};


function* userLogin({ payload: {loginInfo, history}}) {
    try {
        const response = yield call(getUserLoginApi, loginInfo);
        // const responseJson = JSON.stringify(loginInfo);
        if (response.key) {
            saveState(response);
            yield put(actions.userLoginSuccess(response));
            history.push('/');
        }
        else {
            yield put(actions.userLoginError(response));
        }

    } catch (error) {
        yield put(actions.userLoginError(error));
    }
}

function* userLogout() {
    try {
        saveState(null);
        yield put(actions.userLogoutSucces());

    } catch (error) {
    }
}

function* userDetails({ payload: key}) {
    try {
        const response = yield call(getUserDetailsApi, key);
        yield put(actions.userDetailsSuccess(response));
    } catch (error) {
        yield put(actions.userDetailsError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(actionTypes.USER_LOGIN_REQUEST, userLogin)
}

export function* watchUserDetails() {
    yield takeEvery(actionTypes.USER_DETAILS_REQUEST, userDetails)
}

export function* watchUserLogout() {
    yield takeEvery(actionTypes.USER_LOGOUT_REQUEST, userLogout)
}


function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserDetails),
        fork(watchUserLogout),
    ]);
}

export default authSaga;