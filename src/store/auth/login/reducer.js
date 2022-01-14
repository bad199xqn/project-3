import * as actionTypes from "./actionTypes";
import {loadSate} from "../../localStorage";

const savedKey = loadSate()

const userLoginInitialState = {
  error: null,
  loading: false,
  userKey: savedKey,
  // userKey: {key: "46934598094044ee6f6037e07b5e1db731f448ba"}
};

const userDetailsInitialState = {
  error: null,
  loading: false,
  userDetails: null,
};

export const userLogin = (state = userLoginInitialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null
      };
      break;
    case actionTypes.USER_LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        userKey: action.payload,
      };
      break;
    case actionTypes.USER_LOGIN_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

      case actionTypes.FB_LOGIN_REQUEST:
        state = {
          ...state,
          loading: true,
          error: null
        };
        break;
      case actionTypes.FB_LOGIN_SUCCESS:
        state = {
          ...state,
          loading: false,
          userKey: action.payload,
        };
        break;
      case actionTypes.FB_LOGIN_ERROR:
        state = {
          ...state,
          loading: false,
          error: action.payload,
        };
        break;
        case actionTypes.USER_LOGOUT_REQUEST:
          state = {
            ...state,
          };
          break;
          case actionTypes.USER_LOGOUT_SUCCESS:
            state = {
              ...state,
   
              userKey: action.payload
            };
            break;
            case actionTypes.USER_LOGOUT_ERROR:
              state = {
                ...state,
 
              };
              break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export const userDetails = (state = userDetailsInitialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAILS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case actionTypes.USER_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        userDetails: action.payload,
      };
      break;
    case actionTypes.USER_DETAILS_ERROR:
      state = {
        ...state,
        loading: true,
        error: action.payload,
      };
      break;
      case actionTypes.USER_LOGOUT_SUCCESS:
        state = {
          ...state,
          userDetails: null,
        };
        break;
    default:
      state = { ...state };
      break;
  }
  return state;
};



