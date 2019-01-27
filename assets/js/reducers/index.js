import { combineReducers } from "redux";

import signIn from "./signIn";
import signUp from "./signUp";
import session from "./session";
import boards from "./boards";
import currentBoard from "./currentBoard";

export default combineReducers({
  signIn,
  signUp,
  session,
  boards,
  currentBoard
});
