import axios from "axios";
import { route } from "preact-router";
import { JWT_TOKEN } from "../constants";

export const SIGN_UP_BEGIN = "SIGN_UP_BEGIN";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const SIGN_IN_BEGIN = "SIGN_IN_BEGIN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const SIGN_IN_AUTH_FAILURE = "SIGN_IN_AUTH_FAILURE";
export const SIGN_OUT = "SIGN_OUT";

export function getCurrentUser() {
  return dispatch => {
    const header = {
      Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`
    };

    return axios.get("/api/v1/current_user", { headers: header }).then(json => {
      dispatch(signInSuccess(json.data));
      route("/");
    });
  };
}

export function signOutUser() {
  return dispatch => {
    localStorage.removeItem(JWT_TOKEN);
    dispatch(signOut());
  };
}

export const signOut = () => ({
  type: SIGN_OUT
});

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

export const signInSuccess = user_data => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    ...user_data
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

export function signUp(userData) {
  return dispatch => {
    dispatch(signUpBegin());
    return axios
      .post("/api/v1/sign_up", { user: userData })
      .then(json => {
        dispatch(signUpSuccess(json.data));
        route("/");
      })
      .catch(errors => {
        if (errors.response && errors.response.data.errors) {
          dispatch(signUpFailure(errors.response.data.errors));
        } else {
          dispatch(signUpFailure(null));
        }
      });
  };
}

export const signUpBegin = () => ({
  type: SIGN_UP_BEGIN
});

export const signUpSuccess = userData => ({
  type: SIGN_UP_SUCCESS,
  payload: { ...userData }
});

export const signUpFailure = errors => ({
  type: SIGN_UP_FAILURE,
  payload: { errors }
});
