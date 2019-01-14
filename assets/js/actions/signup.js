import axios from "axios";
import { route } from "preact-router";

export const SIGN_UP_BEGIN = "SIGN_UP_BEGIN";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

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
