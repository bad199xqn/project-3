import * as actionTypes from './actionTypes';

export const alertFoldersRequest = (key) => ({
    type: actionTypes.ALERT_FOLDERS_REQUEST,
    payload: key
});

export const alertFoldersSuccess = (folders) => ({
    type: actionTypes.ALERT_FOLDERS_SUCCESS,
    payload: folders
});

export const alertFoldersError = (error) => ({
    type: actionTypes.ALERT_FOLDERS_ERROR,
    payload: error
});

export const alertMentionsRequest = (alertMentionsParams) => ({
    type: actionTypes.ALERT_MENTIONS_REQUEST,
    payload: alertMentionsParams
});

export const alertMentionsSuccess = (alertMentionsData) => ({
    type: actionTypes.ALERT_MENTIONS_SUCCESS,
    payload: alertMentionsData
});

export const alertMentionsError = (error) => ({
    type: actionTypes.ALERT_MENTIONS_ERROR,
    payload: error
});

export const alertMentionsStatisticsRequest = (alertMentionsStatisticsParams) => ({
    type: actionTypes.ALERT_MENTIONS_STATISTICS_REQUEST,
    payload: alertMentionsStatisticsParams
});

export const alertMentionsStatisticsSuccess = (alertMentionsStatisticsData) => ({
    type: actionTypes.ALERT_MENTIONS_STATISTICS_SUCCESS,
    payload: alertMentionsStatisticsData
});

export const alertMentionsStatisticsError = (error) => ({
    type: actionTypes.ALERT_MENTIONS_STATISTICS_ERROR,
    payload: error
});