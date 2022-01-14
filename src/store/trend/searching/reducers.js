import * as actionTypes from './actionTypes';

const initialState = {
    loading: false,
    error: null,
    searchingData: null,
};

const statisticsInitialState = {
    loading: false,
    error: null,
    searchingStatisticsData: null,
};

const keywordDetailsInitialState = {
    loading: false,
    error: null,
    keywordDetailsData: null,
};

export const searching = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.KEYWORD_SEARCHING_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case actionTypes.KEYWORD_SEARCHING_SUCCESS:
            state = {
                ...state,
                loading: false,
                searchingData: action.payload
            };
            break;
        case actionTypes.KEYWORD_SEARCHING_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            };
            break;
        default:
            break;

    };
     return state;
};

export const keywordDetails = (state = keywordDetailsInitialState, action) => {
    switch (action.type) {
        case actionTypes.KEYWORD_DETAILS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case actionTypes.KEYWORD_DETAILS_SUCCESS:
            state = {
                ...state,
                loading: false,
                keywordDetailsData: action.payload
            };
            break;
        case actionTypes.KEYWORD_DETAILS_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            };
            break;
        default:
            break;

    };
     return state;
};

export const searchingStatistics = (state = statisticsInitialState, action) => {
    switch (action.type) {
        case actionTypes.KEYWORD_SEARCHING_STATISTICS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case actionTypes.KEYWORD_SEARCHING_STATISTICS_SUCCESS:
            state = {
                ...state,
                loading: false,
                searchingStatisticsData: action.payload
            };
            break;
        case actionTypes.KEYWORD_SEARCHING_STATISTICS_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            };
            break;
        default:
            break;

    };
     return state;
};
