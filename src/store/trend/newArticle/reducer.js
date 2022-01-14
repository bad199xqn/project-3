import {NEW_ARTICLE_ERROR, NEW_ARTICLE_REQUEST, NEW_ARTICLE_SUCCESS} from './actionTypes';

const initialState = {
    error: null,
    loading: false,
    page: null,
    posts: [],
}

const newArticle = (state = initialState, action) => {
    switch (action.type) {
        case NEW_ARTICLE_REQUEST:
            state = {
                ...state,
                loading: true,
                page: action.payload,
                posts: []
            };
            break;
        case NEW_ARTICLE_SUCCESS:
            state = {
                ...state,
                loading: false,
                posts: action.payload
            };
            break;
        case NEW_ARTICLE_ERROR:
            state = {
                ...state,
                loading: false,
                error: 'loi newArticle'
            };
            break;
    }
    return state;
};

export default newArticle;