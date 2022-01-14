import * as actionTypes from './actionTypes';

export const registerRequest = ({loginInfo, history}) => {
    return {
        type: actionTypes.REGISTER_REQUEST,
        payload: {loginInfo, history}
    }
};

export const registerSuccess = (message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: message
    }
};

export const registerError = (error) => {
    return {
        type: actionTypes.REGISTER_ERROR,
        payload: error
    }
};

