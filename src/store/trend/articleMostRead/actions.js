import {ARTICLE_MOST_READ_REQUEST, ARTICLE_MOST_READ_SUCCESS, ARTICLE_MOST_READ_ERROR } from './actionTypes';

export const articleMostReadRequest = (topic) => ({
    type: ARTICLE_MOST_READ_REQUEST,
    payload: topic
})

export const articleMostReadSuccess = (posts) => ({
    type: ARTICLE_MOST_READ_SUCCESS,
    payload: posts
})

export const articleMostReadError = (error) => ({
    type: ARTICLE_MOST_READ_ERROR,
    payload: error
})