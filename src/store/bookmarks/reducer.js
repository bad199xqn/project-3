
import * as actionTypes from './actionTypes';

const userBookmarksState = {
  error: null,
  loading: false,
  data: {},
};

export const userBookmarks = (state = userBookmarksState, action) => {
  switch (action.type) {
    case actionTypes.USER_BOOKMARKS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case actionTypes.USER_BOOKMARKS_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload,
      };
      break;
    case actionTypes.USER_BOOKMARKS_ERROR:
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

