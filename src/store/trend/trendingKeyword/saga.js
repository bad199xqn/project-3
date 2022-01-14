import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {TRENDING_KEYWORD_ERROR, TRENDING_KEYWORD_SUCCESS, TRENDING_KEYWORD_REQUEST} from './actionTypes';

import {trendingKeywordRequest, trendingKeywordSuccess, trendingKeywordError} from './actions';

import axios from 'axios';
import { api_v2 } from "../../../services/api";


function getApi(topic, duration) {
    let data = JSON.stringify({});
    const cacheName = 'trending-'+duration;
    const cacheData = !localStorage.getItem(cacheName) ? [] : JSON.parse(localStorage.getItem(cacheName));

    const config = {
      method: 'get',
      url: `${api_v2}/trends/?format=json&number=20&topic=${topic}&min_article=2&duration=1`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data,
      timeout: 5000,
    };
    
   return axios(config)
    .then(function (response) {
        if (cacheData !== response.data) {
            const data = JSON.stringify(response.data)
            localStorage.setItem(cacheName, data)
        }
    return(response.data)
    })
    .catch(function (error) {
    return cacheData
    });
};

function* fetchTrendingKeyword({payload: filter}) {
    try {
        const response = yield call(getApi, filter[0], filter[1]);
        yield put(trendingKeywordSuccess(response));
    } catch (error) {
        yield put(trendingKeywordError(error));
    }
};

export function* watchFetchTrendingKeyword() {
    yield takeEvery(TRENDING_KEYWORD_REQUEST, fetchTrendingKeyword)
};

function* trendingKeywordSaga() {
    yield all([
        fork(watchFetchTrendingKeyword)
    ])
};

export default trendingKeywordSaga;