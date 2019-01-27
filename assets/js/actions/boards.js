import axios from "axios";
import { JWT_TOKEN } from "../constants";
import { route } from "preact-router";

export const CREATE_BOARD_BEGIN = "CREATE_BOARD_BEGIN";
export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const CREATE_BOARD_FAILURE = "CREATE_BOARD_FAILURE";
export const FETCH_BOARDS_BEGIN = "FETCH_BOARDS_BEGIN";
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS";
export const FETCH_BOARDS_FAILURE = "FETCH_BOARDS_FAILURE";

export function fetchBoards() {
  return dispatch => {
    const header = {
      Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`
    };

    return axios.get("/api/v1/boards", { headers: header }).then(json => {
      dispatch(fetchBoardsSuccess(json.data));
    });
  };
}

export const fetchBoardsBegin = () => ({
  type: FETCH_BOARDS_BEGIN
});

export const fetchBoardsSuccess = boards => ({
  type: FETCH_BOARDS_SUCCESS,
  payload: {
    ...boards
  }
});

export const fetchBoardsFailure = errors => ({
  type: FETCH_BOARDS_FAILURE,
  payload: { errors }
});

export function createBoard(boardData) {
  return dispatch => {
    const header = {
      Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`
    };

    return axios
      .post("/api/v1/boards", { board: boardData }, { headers: header })
      .then(json => {
        dispatch(createBoardSuccess(json.data));
        route(`/board/${json.data.board.id}`);
      });
  };
}

export const createBoardBegin = () => ({
  type: CREATE_BOARD_BEGIN
});

export const createBoardSuccess = board => ({
  type: CREATE_BOARD_SUCCESS,
  payload: {
    ...board
  }
});

export const createBoardFailure = errors => ({
  type: CREATE_BOARD_FAILURE,
  payload: { errors }
});
