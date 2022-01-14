import * as actionTypes from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  notificationsData: {},
};

export const notifications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case actionTypes.NOTIFICATIONS_SUCCESS:
      state = {
        ...state,
        loading: false,
        notificationsData: action.payload,
      };
      break;
    case actionTypes.NOTIFICATIONS_ERROR:
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

