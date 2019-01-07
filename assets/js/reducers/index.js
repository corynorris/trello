import { combineReducers } from "redux";

import signIn from "./signIn";
import signUp from "./signUp";
import session from "./session";

export default combineReducers({
  signIn,
  signUp,
  session
});
