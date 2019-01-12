import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_AUTH_FAILURE
} from "../actions";

const initialState = {
  loading: false,
  errors: {}
};

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_BEGIN:
      console.log("SIGN_IN_BEGIN received");
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case SIGN_IN_SUCCESS:
      console.log("SIGN_IN_SUCCESS received");
      return {
        ...state,
        loading: false
      };
    case SIGN_IN_AUTH_FAILURE:
      console.log("AUTH_FAILURE received");
      return {
        ...state,
        loading: false,
        errors: {
          email: "invalid email or password",
          password: "invalid email or password"
        }
      };
    case SIGN_IN_FAILURE:
      console.log("SIGN_IN_FAILURE received");
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
