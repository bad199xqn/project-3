import * as actionTypes from './actionTypes';

export const userBookmarksRequest = (key) => ({
    type: actionTypes.USER_BOOKMARKS_REQUEST,
    payload: key
})

export const userBookmarksSuccess = (data) => ({
    type: actionTypes.USER_BOOKMARKS_SUCCESS,
    payload: data
})

export const userBookmarksError = (error) => ({
    type: actionTypes.USER_BOOKMARKS_ERROR,
    payload: error
})