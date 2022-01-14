import {ARTICLE_MOST_READ_REQUEST, ARTICLE_MOST_READ_SUCCESS, ARTICLE_MOST_READ_ERROR } from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  topic: "",
  posts: [],
};

const articleMostRead = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_MOST_READ_REQUEST:
      state = {
        ...state,
        loading: true,
        topic: action.payload
      };
      break;
    case ARTICLE_MOST_READ_SUCCESS:
      state = {
        ...state,
        loading: false,
        posts: action.payload,
      };
      break;
    case ARTICLE_MOST_READ_ERROR:
      state = {
        ...state,
        loading: false,
        error: "Co loi xay ra",
      };
      break;

    default:
      break;
  }

  return state;
};

export default articleMostRead;