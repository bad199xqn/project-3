import {TRENDING_KEYWORD_REQUEST, TRENDING_KEYWORD_SUCCESS, TRENDING_KEYWORD_ERROR} from './actionTypes';

const initialState = {
    loading: false,
    error: null,
    posts: [],
    filter: [],
};

const trendingKeyword = (state = initialState, action) => {
    switch (action.type) {
        case TRENDING_KEYWORD_REQUEST:
            state = {
                ...state,
                loading: true,
                filter: action.payload,
            }
            break;
        case TRENDING_KEYWORD_SUCCESS:
            state={
                ...state,
                loading:false,
                posts: action.payload
            }
            break;
        case TRENDING_KEYWORD_ERROR:
            state={
                ...state,
                loading:false,
                error: "co loi trending keyword"
            }
    
        default:
            break;
    }
    return state
};

export default trendingKeyword;