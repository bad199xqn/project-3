import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import axios from 'axios';
import { api_v2 } from '../../../services/api';

function getApi(loginInfo) {
    let data = JSON.stringify(loginInfo);
    const config = {
      method: 'post',
      url: `${api_v2}/auth/registration`,
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
        // console.log(error)
      return(error);

    });
};




function* register({ payload: {loginInfo, history}}) {
    try {
        const response = yield call(getApi, loginInfo);
        if (response.detail) {
            yield put(actions.registerSuccess(response));
            history.push('/login');
        }
        else {
            yield put(actions.registerError(response));
        }

    } catch (error) {
        yield put(actions.registerError(error));
    }
}




export function* watchRegister() {
    yield takeEvery(actionTypes.REGISTER_REQUEST, register)
}


function* registerSaga() {
    yield all([
        fork(watchRegister),
    ]);
}

export default registerSaga;