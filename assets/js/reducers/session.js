import { SIGN_UP_SUCCESS, SIGN_IN_SUCCESS } from "../actions";

const initialState = {
  signedIn: false,
  jwt: null,
  currentUser: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      console.log("SIGN_UP_SUCCESS received");
      console.log(action);
      return {
        ...state,
        signedIn: true,
        jwt: action.payload.jwt,
        currentUser: action.payload.user
      };
    default:
      return state;
  }
};

export default session;
