import * as actionTypes from "./actionTypes";

const initialState = {
  error: null,
  loading: false,
  message: null,
};


 const register = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null
      };
      break;
    case actionTypes.REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;
    case actionTypes.REGISTER_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default register;