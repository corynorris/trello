import { SET_CURRENT_USER_SUCCESS, SIGN_OUT_SUCCESS } from "../actions/session";

const initialState = {
  currentUser: null,
  socket: null,
  userChannel: null,
  boardChannel: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
};

export default session;
