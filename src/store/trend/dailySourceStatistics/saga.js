import {DAILY_SOURCE_STATISTICS_REQUEST, } from './actionTypes';
import {dailySourceStatisticsError, dailySourceStatisticsSuccess} from './actions';
import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import axios from 'axios';
import { api_v1 } from '../../../services/api';

function getApi(duration) {
    let data = JSON.stringify({});

    const config = {
      method: 'get',
      url: `${api_v1}/sources/daily_statistics?duration=${duration}`,
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
    //   console.log(error);
    });
};

function* fetchDailySourceStatistics({payload: duration}) {
    try {
        const response = yield call(getApi, duration);
        yield put(dailySourceStatisticsSuccess(response));
    } catch (error) {
        yield put(dailySourceStatisticsError(error));
    }
}

export function* watchFetchDailySourceStatistics() {
    yield takeEvery(DAILY_SOURCE_STATISTICS_REQUEST, fetchDailySourceStatistics)
}

function* dailySourceStatisticsSage() {
    yield all([
        fork(watchFetchDailySourceStatistics)
    ])
}

export default dailySourceStatisticsSage;