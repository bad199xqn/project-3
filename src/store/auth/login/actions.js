import * as actionTypes from './actionTypes';

export const userLoginRequest = ({loginInfo, history}) => {
    return {
        type: actionTypes.USER_LOGIN_REQUEST,
        payload: {loginInfo, history}
    }
};

export const userLoginSuccess = (userKey) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: userKey
    }
};

export const userLoginError = (error) => {
    return {
        type: actionTypes.USER_LOGIN_ERROR,
        payload: error
    }
};


export const userDetailsReqest = (key) => {
    return {
        type: actionTypes.USER_DETAILS_REQUEST,
        payload: key
    }
};

export const userDetailsSuccess = (userDetails) => {
    return {
        type: actionTypes.USER_DETAILS_SUCCESS,
        payload: userDetails
    }
};

export const userDetailsError = (error) => {
    return {
        type: actionTypes.USER_DETAILS_ERROR,
        payload: error
    }
};

export const userLogoutRequest = () => {
    return {
        type: actionTypes.USER_LOGOUT_REQUEST,
        payload: {}
    }
};

export const userLogoutSucces = () => {
    return {
        type: actionTypes.USER_LOGOUT_SUCCESS,
        payload: null
    }
};

export const userLogoutError = () => {
    return {
        type: actionTypes.USER_LOGOUT_ERROR,
        payload: {}
    }
};
