import { combineReducers } from "redux";
import signUp from "./signUp";
import auth from "./auth";

export default combineReducers({
  signUp,
  auth
});
