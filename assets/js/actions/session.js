import axios from "axios";
import { Socket } from "phoenix";
import { JWT_TOKEN } from "../constants";

export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SET_CURRENT_USER_SUCCESS = "SET_CURRENT_USER_SUCCESS";

// Gets the current user and connects to channel
export function setCurrentUser(user) {
  return dispatch => {
    let socket = new Socket("/socket", {
      params: { token: localStorage.getItem(JWT_TOKEN) }
    });

    socket.connect();
    const channel = socket.channel(`users:${user.id}`);

    channel.join().receive("ok", () => {
      dispatch(
        setCurrentUserSuccess({
          socket: socket,
          userChannel: channel,
          currentUser: user
        })
      );
    });
  };
}

export const setCurrentUserSuccess = userData => ({
  type: SET_CURRENT_USER_SUCCESS,
  payload: {
    ...userData
  }
});

export function getCurrentUser() {
  return dispatch => {
    const header = {
      Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`
    };

    return axios.get("/api/v1/current_user", { headers: header }).then(json => {
      dispatch(setCurrentUser(json.data.user));
    });
  };
}

export function signOutUser() {
  return dispatch => {
    localStorage.removeItem(JWT_TOKEN);
    dispatch(signOutSuccess());
  };
}

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});
