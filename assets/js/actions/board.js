import axios from "axios";
import { JWT_TOKEN } from "../constants";

export const FETCH_BOARD_BEGIN = "FETCH_BOARD_BEGIN";
export const FETCH_BOARD_SUCCESS = "FETCH_BOARD_SUCCESS";
export const FETCH_BOARD_FAILURE = "FETCH_BOARD_FAILURE";

export function fetchBoard(id) {
  return dispatch => {
    const header = {
      Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`
    };

    return axios.get(`/api/v1/board/${id}`, { headers: header }).then(json => {
      dispatch(fetchBoardSuccess(json.data));
    });
  };
}

export const fetchBoardBegin = () => ({
  type: FETCH_BOARD_BEGIN
});

export const fetchBoardSuccess = board => ({
  type: FETCH_BOARD_SUCCESS,
  payload: {
    ...board
  }
});

export const fetchBoardFailure = errors => ({
  type: FETCH_BOARD_FAILURE,
  payload: { errors }
});
