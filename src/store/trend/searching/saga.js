import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import axios from 'axios';
import { api_v2 } from '../../../services/api';

function getApi(keyword, duration, page, range_filter, start_date, interval, sentimentality_filter, source_filter) {
    let data = JSON.stringify({});

    const config = {
      method: 'get',
      url: `${api_v2}/search/?page=${page}&sort=desc&format=json&range_filter=${range_filter}&keyword=${keyword}&start_date=${start_date}&interval=${interval}&duration=${duration}&sentimentality_filter=${sentimentality_filter}&source_filter=${source_filter}`,
      headers: { 
        // 'Authorization': 'Token 46934598094044ee6f6037e07b5e1db731f448ba', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    
   return axios(config)
    .then(function (response) {
    return(response.data)
    })
    .catch(function (error) {
      // console.log(error);
    });
};

function getKeywordDetailsApi(keyword, duration, page, range_filter, start_date, interval, sentimentality_filter, source_filter) {
  let data = JSON.stringify({});

  const url = `${api_v2}/trending/?page=${page}&sort=desc&format=json&range_filter=${range_filter}&keyword=${keyword}&start_date=${start_date}&interval=${interval}&duration=${duration}&sentimentality_filter=${sentimentality_filter}&source_filter=${source_filter}`;
  const config = {
    method: 'get',
    url: url,
    headers: { 
      // 'Authorization': 'Token 46934598094044ee6f6037e07b5e1db731f448ba', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  
 return axios(config)
  .then(function (response) {
  return(response.data)
  })
  .catch(function (error) {
    console.log(url)
    // console.log(error);
  });
};

function getStatisticsApi(keyword, duration, source_filter, start_date, interval, range_filter, type) {
    let data = JSON.stringify({});

    const url = `${api_v2}/${type}/statistics/?keyword=${keyword}&duration=${duration}&num_of_point=${interval}&format=json&start_date=${start_date}&interval=${interval}&source_filter=${source_filter}&range_filter=${range_filter}`;
    const config = {
      method: 'get',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    
   return axios(config)
    .then(function (response) {
      
    return(response.data)

    })
    .catch(function (error) {
      console.log(url)
      // console.log(error);
    });
};

function* fetchSearching({payload: searchingParams}) {
    try {

        const response = yield call(getApi, searchingParams.keyword, searchingParams.duration, searchingParams.page, searchingParams.range_filter, searchingParams.start_date, searchingParams.interval, searchingParams.sentimentality_filter, searchingParams.source_filter);
        yield put(actions.searchingSuccess(response));
    } catch (error) {
        yield put(actions.searchingError(error));
    }
}

function* fetchSearchingStatistics({payload: searchingStatisticsParams}) {
    try {

        const response = yield call(getStatisticsApi, searchingStatisticsParams.keyword, searchingStatisticsParams.duration,  searchingStatisticsParams.source_filter, searchingStatisticsParams.start_date, searchingStatisticsParams.interval,searchingStatisticsParams.range_filter, searchingStatisticsParams.type);
        yield put(actions.searchingStatisticsSuccess(response));
    } catch (error) {
        yield put(actions.searchingStatisticsError(error));
    }
}

function* fetchKeywordDetails({payload: keywordDetailsParams}) {
  try {

      const response = yield call(getKeywordDetailsApi, keywordDetailsParams.keyword, keywordDetailsParams.duration, keywordDetailsParams.page, keywordDetailsParams.range_filter, keywordDetailsParams.start_date, keywordDetailsParams.interval, keywordDetailsParams.sentimentality_filter, keywordDetailsParams.source_filter);
      yield put(actions.keywordDetailsSuccess(response));
  } catch (error) {
      yield put(actions.keywordDetailsError(error));
  }
}


export function* watchFetchSearching() {
    yield takeEvery(actionTypes.KEYWORD_SEARCHING_REQUEST, fetchSearching)
}

export function* watchFetchSearchingStatistics() {
    yield takeEvery(actionTypes.KEYWORD_SEARCHING_STATISTICS_REQUEST, fetchSearchingStatistics)
}

export function* watchFetchKeywordDetails() {
  yield takeEvery(actionTypes.KEYWORD_DETAILS_REQUEST, fetchKeywordDetails)
}

function* searchingSaga() {
    yield all([
        fork(watchFetchSearching),
        fork(watchFetchSearchingStatistics),
        fork(watchFetchKeywordDetails),
    ])
}

export default searchingSaga;