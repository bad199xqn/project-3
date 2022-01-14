import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import axios from 'axios';
import { api_v1, api_v2 } from "../../services/api";

function getAlertFoldersApi(key) {
    let data = JSON.stringify({});

    const config = {
      method: 'get',
      url: `${api_v1}/folders/?format=json`,
      headers: { 
        'Authorization': `Token ${key}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
   return axios(config)
    .then(function (response) {
    return(response.data.results)
    })
    .catch(function (error) {
    });
};


function getAlertMentionsApi(key, alertPk, page, publicToken,  duration, start_date, interval, source_filter, sentimentality_filter) {
    let data = JSON.stringify({}); 
    const url = publicToken === null ? `${api_v2}/alerts/${alertPk}/mentions/?format=json&page=${page}&start_date=${start_date}&interval=${interval}&duration=${duration}&source_filter=${source_filter}&sentimentality_filter=${sentimentality_filter}` : 
      `${api_v1}/alerts/public_mentions/${publicToken}/?format=json&page=${page}&start_date=${start_date}&interval=${interval}&duration=${duration}&source_filter=${source_filter}&sentimentality_filter=${sentimentality_filter}`
    const config = {
      method: 'get',
      url: url,
      headers: { 
        'Authorization': publicToken === null ? `Token ${key}` : '', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    
   return axios(config)
    .then(function (response) {
    return(response.data)
    })
    .catch(function (error) {
      // console.log(`dmm loi ${error}`);
    });
  };
  
  function getAlertMentionsStatisticsApi(key, alertPk, duration, interval, publicToken) {
    // console.log(publicToken)
      let data = JSON.stringify({});
      const url = publicToken === null ? 
      `${api_v1}/alerts/${alertPk}/mentions/statistics?duration=${duration}&num_of_point=${interval}&format=json&source_filter=1,2,3,4` 
      : `${api_v1}/alerts/public_statistics/${publicToken}/?duration=${duration}&num_of_point=${interval}&format=json&source_filter=1,2,3,4`
      const config = {
        method: 'get',
        url: url,
        headers: { 
        'Authorization': publicToken === null ? `Token ${key}` : '', 
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

function* fetchAlertFolders({payload: key}) {
    try {
        const response = yield call(getAlertFoldersApi, key);
        yield put(actions.alertFoldersSuccess(response));
    }
    catch {
        yield put(actions.alertFoldersError());
    }
}

function* fetchAlertMentions({payload: alertMentionsParams}) {
  try {
      const response = yield call(getAlertMentionsApi, alertMentionsParams.key, alertMentionsParams.alertPk, alertMentionsParams.page, alertMentionsParams.publicToken, alertMentionsParams.duration, alertMentionsParams.start_date, alertMentionsParams.interval, alertMentionsParams.source_filter, alertMentionsParams.sentimentality_filter);
      yield put(actions.alertMentionsSuccess(response));
  }
  catch (error) {
    // console.log(`dmm   ${error}`);
      yield put(actions.alertMentionsError());
  }
}

function* fetchAlertMentionsStatistics({payload: alertMentionsStatisticsParams}) {
    try {
        const response = yield call(getAlertMentionsStatisticsApi, alertMentionsStatisticsParams.key, alertMentionsStatisticsParams.alertPk, alertMentionsStatisticsParams.duration, alertMentionsStatisticsParams.interval, alertMentionsStatisticsParams.publicToken);
        yield put(actions.alertMentionsStatisticsSuccess(response));
    }
    catch {
        yield put(actions.alertMentionsStatisticsError());
    }
}

function* watchFetchAlertFolders() {
    yield takeEvery(actionTypes.ALERT_FOLDERS_REQUEST, fetchAlertFolders)
};

function* watchFetchAlertMentions() {
    yield takeEvery(actionTypes.ALERT_MENTIONS_REQUEST, fetchAlertMentions)
};

function* watchFetchAlertMentionsStatistics() {
    yield takeEvery(actionTypes.ALERT_MENTIONS_STATISTICS_REQUEST, fetchAlertMentionsStatistics)
};

function* AlertsSaga() {
    yield all([
        fork(watchFetchAlertFolders),
        fork(watchFetchAlertMentions),
        fork(watchFetchAlertMentionsStatistics),
    ])
}

export default AlertsSaga;