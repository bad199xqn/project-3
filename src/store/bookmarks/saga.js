import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import axios from 'axios';
import { api_v2 } from "../../services/api";

function getUserBookmarksApi(key) {
    let data = JSON.stringify({});

    const config = {
      method: 'get',
      url: `${api_v2}/bookmarks/?format=json`,
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

function* fetchUserBookmarks({payload: key}) {
    try {
        const response = yield call(getUserBookmarksApi, key);
        yield put(actions.userBookmarksSuccess(response));
    }
    catch {
        yield put(actions.userBookmarksError());
    }
}

function* watchFetchUserBookmarks() {
    yield takeEvery(actionTypes.USER_BOOKMARKS_REQUEST, fetchUserBookmarks)
};

function* userBookmarksSaga() {
    yield all([
        fork(watchFetchUserBookmarks)
    ])
}

export default userBookmarksSaga;