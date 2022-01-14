
import * as actionTypes from './actionTypes';

const alertFoldersState = {
  error: null,
  loading: false,
  folders: null,
};

const alertMentionsState = {
  error: null,
  loading: false,
  alertMentionsData: null,
};

const alertMentionsStatisticsState = {
  error: null,
  loading: false,
  alertMentionsStatisticsData: null,
};

export const alertFolders = (state = alertFoldersState, action) => {
  switch (action.type) {
    case actionTypes.ALERT_FOLDERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case actionTypes.ALERT_FOLDERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        folders: action.payload,
      };
      break;
    case actionTypes.ALERT_FOLDERS_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

    default:
      break;
  }

  return state;
};

export const alertMentions = (state = alertMentionsState, action) => {
  switch (action.type) {
      case actionTypes.ALERT_MENTIONS_REQUEST:
          state = {
              ...state,
              loading: true,
          };
          break;
      case actionTypes.ALERT_MENTIONS_SUCCESS:
          state = {
              ...state,
              loading: false,
              alertMentionsData: action.payload
          };
          break;
      case actionTypes.ALERT_MENTIONS_ERROR:
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

export const alertMentionsStatistics = (state = alertMentionsStatisticsState, action) => {
  switch (action.type) {
      case actionTypes.ALERT_MENTIONS_STATISTICS_REQUEST:
          state = {
              ...state,
              loading: true,
          };
          break;
      case actionTypes.ALERT_MENTIONS_STATISTICS_SUCCESS:
          state = {
              ...state,
              loading: false,
              alertMentionsStatisticsData: action.payload
          };
          break;
      case actionTypes.ALERT_MENTIONS_STATISTICS_ERROR:
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

