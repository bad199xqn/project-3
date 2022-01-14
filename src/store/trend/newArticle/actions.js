import {NEW_ARTICLE_ERROR, NEW_ARTICLE_REQUEST, NEW_ARTICLE_SUCCESS} from './actionTypes';

export const newArticleRequest = (page) => ({
    type: NEW_ARTICLE_REQUEST,
    payload: page
});

export const newArticleSuccess = (posts) => ({
    type: NEW_ARTICLE_SUCCESS,
    payload: posts
});

export const newArticleError = (error) => ({
    type: NEW_ARTICLE_ERROR,
    payload: error,
});