import {TRENDING_KEYWORD_REQUEST, TRENDING_KEYWORD_SUCCESS, TRENDING_KEYWORD_ERROR} from './actionTypes';

export const trendingKeywordRequest = (topic) => ({
    type: TRENDING_KEYWORD_REQUEST,
    payload: topic
});

export const trendingKeywordSuccess = (posts) => ({
    type: TRENDING_KEYWORD_SUCCESS,
    payload: posts
});

export const trendingKeywordError = (error) => ({
    type: TRENDING_KEYWORD_ERROR,
    payload: error
})