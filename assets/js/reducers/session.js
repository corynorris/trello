import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from "../actions/session";
import { SIGN_UP_SUCCESS } from "../actions/signup";

const initialState = {
  signedIn: false,
  currentUser: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signedIn: true,
        currentUser: action.payload.user
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        signedIn: false,
        currentUser: null
      };
    default:
      return state;
  }
};

export default session;
