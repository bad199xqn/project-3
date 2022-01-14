import {DAILY_SOURCE_STATISTICS_ERROR, DAILY_SOURCE_STATISTICS_REQUEST, DAILY_SOURCE_STATISTICS_SUCCESS} from './actionTypes';

const initialState = {
    loading: false,
    error: null,
    duration: 0,
    dailySourceStatisticsData: {}
};

const dailySourceStatistics = (state = initialState, action) => {
    switch (action.type) {
        case DAILY_SOURCE_STATISTICS_REQUEST:
            state = {
                ...state,
                loading: true,
                duration: action.payload
            };
            break;
        case DAILY_SOURCE_STATISTICS_SUCCESS:
            state = {
                ...state,
                loading: false,
                dailySourceStatisticsData: action.payload
            };
            break;
        case DAILY_SOURCE_STATISTICS_ERROR:
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

export default dailySourceStatistics;