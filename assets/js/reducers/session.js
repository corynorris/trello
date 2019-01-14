import { SIGN_UP_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT } from "../actions/session";

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
    case SIGN_OUT:
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
