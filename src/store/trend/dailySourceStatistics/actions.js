import {DAILY_SOURCE_STATISTICS_ERROR, DAILY_SOURCE_STATISTICS_REQUEST, DAILY_SOURCE_STATISTICS_SUCCESS} from './actionTypes';

export const dailySourceStatisticsRequest = (duration) => ({
    type: DAILY_SOURCE_STATISTICS_REQUEST,
    payload: duration
});

export const dailySourceStatisticsSuccess = (dailySourceStatisticsData) => ({
    type: DAILY_SOURCE_STATISTICS_SUCCESS,
    payload: dailySourceStatisticsData
});

export const dailySourceStatisticsError = (error) => ({
    type: DAILY_SOURCE_STATISTICS_ERROR,
    payload: 'Co loi dailySourceStatistics'
});