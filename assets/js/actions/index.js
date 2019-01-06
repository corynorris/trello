import axios from "axios";

export const SIGN_UP_BEGIN = "SIGN_UP_BEGIN";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const SIGN_IN_BEGIN = "SIGN_IN_BEGIN";

export function signUp(userData) {
  return dispatch => {
    dispatch(signUpBegin());
    return axios
      .post("/api/v1/sign_up", { user: userData })
      .then(json => {
        dispatch(signUpSuccess(json));
        return json;
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
  payload: { userData }
});

export const signUpFailure = errors => ({
  type: SIGN_UP_FAILURE,
  payload: { errors }
});

export const signIn = user_data => ({
  type: SIGN_IN_BEGIN,
  user_data
});
