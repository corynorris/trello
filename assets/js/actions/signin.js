import axios from "axios";
import { route } from "preact-router";
import { JWT_TOKEN } from "../constants";

export const SIGN_IN_BEGIN = "SIGN_IN_BEGIN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const SIGN_IN_AUTH_FAILURE = "SIGN_IN_AUTH_FAILURE";

export function signIn(credentials) {
  return dispatch => {
    dispatch(signInBegin());

    return axios
      .post("/api/v1/sign_in", { credentials: credentials })
      .then(json => {
        localStorage.setItem(JWT_TOKEN, json.data.token);
        dispatch(signInSuccess(json.data));
        route("/");
      })
      .catch(errors => {
        if (errors.response && errors.response.data.errors) {
          dispatch(signInFailure(errors.response.data.errors));
        } else if (errors.response && errors.response.data.message) {
          dispatch(signInAuthFailure(errors.response.data.message));
        } else {
          dispatch(signInFailure());
        }
      });
  };
}

export const signInBegin = () => ({
  type: SIGN_IN_BEGIN
});

export const signInSuccess = userData => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    ...userData
  }
});

export const signInFailure = errors => ({
  type: SIGN_IN_FAILURE,
  payload: { errors }
});

export const signInAuthFailure = errors => ({
  type: SIGN_IN_AUTH_FAILURE,
  payload: { errors }
});
