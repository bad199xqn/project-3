import { all, call, fork, takeEvery, put } from "redux-saga/effects";
import {NEW_ARTICLE_ERROR, NEW_ARTICLE_REQUEST, NEW_ARTICLE_SUCCESS} from './actionTypes';
import {newArticleError, newArticleRequest, newArticleSuccess} from './actions';
import { addDataIntoCache, getCacheData } from "../../../utils/data-cache";

import axios from 'axios';
import { api_v1 } from "../../../services/api";

function getApi(page) {
    let data = JSON.stringify({});

    const url = `${api_v1}/articles?source=&page=${page}`;
    const config = {
      method: 'get',

      headers: { 

        'Content-Type': 'application/json'
      },
      data : data
    };
    
   return fetch(url, config)
   .then(response => response.json())
    .then( (data) => {
        if(page === 1) {
            addDataIntoCache('vnalert-dashboard', url, data.results)
        }
    return(data.results)
    })
    .catch(function (error) {
        return getCacheData('vnalert-dashboard', `${api_v1}/articles?source=&page=1`).then( cacheData => cacheData)
    //   console.log(error);
    });
};

function* fetchNewArticle({payload: page}) {
    try {
        const response = yield call(getApi, page);
        yield put(newArticleSuccess(response));
    }
    catch {
        yield put(newArticleError());
    }
};

export function* watchFetchNewArticle() {
    yield takeEvery(NEW_ARTICLE_REQUEST, fetchNewArticle);
};

function* newArticleSaga() {
    yield all([
        fork(watchFetchNewArticle)
    ])
};

export default newArticleSaga;



