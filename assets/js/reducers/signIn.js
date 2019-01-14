import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_AUTH_FAILURE
} from "../actions/session";

const initialState = {
  loading: false,
  errors: {}
};

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_BEGIN:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SIGN_IN_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        errors: {
          email: "invalid email or password",
          password: "invalid email or password"
        }
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors || {}
      };
    default:
      return state;
  }
};

export default signIn;
