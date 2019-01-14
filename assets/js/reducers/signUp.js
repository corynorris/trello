import {
  SIGN_UP_BEGIN,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../actions/signup";

const initialState = {
  loading: false,
  errors: {}
};

const signUp = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_BEGIN:
      console.log("SIGN_UP_BEGIN received");
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case SIGN_UP_SUCCESS:
      console.log("SIGN_UP_SUCCESS received");
      return {
        ...state,
        loading: false
      };
    case SIGN_UP_FAILURE:
      console.log("SIGN_UP_FAILURE received");
      console.log(action);
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default signUp;
