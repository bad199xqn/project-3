import * as actionTypes from './actionTypes';

export const notificationsRequest = () => ({
    type: actionTypes.NOTIFICATIONS_REQUEST,
    payload: {}
})

export const notificationsSuccess = (notificationsData) => ({
    type: actionTypes.NOTIFICATIONS_SUCCESS,
    payload: notificationsData
})

export const notificationsError = (error) => ({
    type: actionTypes.NOTIFICATIONS_ERROR,
    payload: error
})