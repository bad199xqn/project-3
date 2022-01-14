import * as actionTypes from './actionTypes';

export const searchingRequest = (searchingParams) => ({
    type: actionTypes.KEYWORD_SEARCHING_REQUEST,
    payload: searchingParams
});

export const searchingSuccess = (seachingData) => ({
    type: actionTypes.KEYWORD_SEARCHING_SUCCESS,
    payload: seachingData
});

export const searchingError = (error) => ({
    type: actionTypes.KEYWORD_SEARCHING_ERROR,
    payload: error
});

export const keywordDetailsRequest = (keywordDetailsParams) => ({
    type: actionTypes.KEYWORD_DETAILS_REQUEST,
    payload: keywordDetailsParams
});

export const keywordDetailsSuccess = (keywordDetailsData) => ({
    type: actionTypes.KEYWORD_DETAILS_SUCCESS,
    payload: keywordDetailsData
});

export const keywordDetailsError = (error) => ({
    type: actionTypes.KEYWORD_DETAILS_ERROR,
    payload: error
});

export const searchingStatisticsRequest = (searchingStatisticsParams) => ({
    type: actionTypes.KEYWORD_SEARCHING_STATISTICS_REQUEST,
    payload: searchingStatisticsParams
});

export const searchingStatisticsSuccess = (seachingStatisticsData) => ({
    type: actionTypes.KEYWORD_SEARCHING_STATISTICS_SUCCESS,
    payload: seachingStatisticsData
});

export const searchingStatisticsError = (error) => ({
    type: actionTypes.KEYWORD_SEARCHING_STATISTICS_ERROR,
    payload: error
});