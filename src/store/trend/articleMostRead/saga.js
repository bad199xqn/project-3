import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {ARTICLE_MOST_READ_REQUEST, ARTICLE_MOST_READ_SUCCESS, ARTICLE_MOST_READ_ERROR } from './actionTypes';

import {articleMostReadRequest, articleMostReadSuccess, articleMostReadError} from './actions';

import { addDataIntoCache, getCacheData } from "../../../utils/data-cache";

import axios from 'axios';
import { api_v2 } from "../../../services/api";

function getApi(topic) {
    let data = JSON.stringify({});

    const config = {
      method: 'get',
      url: `${api_v2}/most_read_articles/?topic=${topic}&format=json&number=20`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
   return axios(config)
    .then(function (response) {
        addDataIntoCache('vnalert-dashboard', config.url, response.data)
    return(response.data)
    })
    .catch(function (error) {
        return getCacheData('vnalert-dashboard', config.url).then( cacheData => cacheData)
    //   console.log(error);
    });
};

function* fetchArticleMostRead({payload: topic}) {
    try {
        const response = yield call(getApi, topic);
        yield put(articleMostReadSuccess(response));
    } catch (error) {
        yield put(articleMostReadError(error));
    }
}

export function* watchFetchArticleMostRead() {
    yield takeEvery(ARTICLE_MOST_READ_REQUEST, fetchArticleMostRead)
}

function* articleMostReadSaga() {
    yield all([
        fork(watchFetchArticleMostRead)
    ])
}

export default articleMostReadSaga;