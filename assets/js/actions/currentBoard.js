import axios from "axios";
import { JWT_TOKEN } from "../constants";

export const BOARD_CHANNEL_JOINED = "BOARD_CHANNEL_JOINED";
export const FETCH_CURRENT_BOARD_BEGIN = "FETCH_CURRENT_BOARD_BEGIN";
export const FETCH_CURRENT_BOARD_SUCCESS = "FETCH_CURRENT_BOARD_SUCCESS";
export const FETCH_CURRENT_BOARD_FAILURE = "FETCH_CURRENT_BOARD_FAILURE";
export const CREATE_LIST_SUCCESS = "CREATE_LIST_SUCCESS";
export const UPDATE_LIST_SUCCESS = "UPDATE_LIST_SUCCESS";

export function connectToChannel(socket, id) {
  return dispatch => {
    const channel = socket.channel(`boards:${id}`);
    dispatch(fetchCurrentBoardBegin());

    channel.join().receive("ok", response => {
      console.log(response);
      dispatch(fetchCurrentBoardSuccess(response.board));
    });

    channel.on("list:created", list => {
      console.log(list);
      dispatch(createListSuccess(list));
    });

    channel.on("list:updated", list => {
      console.log(list);
      dispatch(updateListSuccess(list));
    });

    dispatch(boardChannelJoined({ boardChannel: channel }));
  };
}

export const fetchCurrentBoardBegin = () => ({
  type: FETCH_CURRENT_BOARD_BEGIN
});

export const fetchCurrentBoardSuccess = board => ({
  type: FETCH_CURRENT_BOARD_SUCCESS,
  payload: {
    currentBoard: board
  }
});

export const fetchCurrentBoardFailure = errors => ({
  type: FETCH_CURRENT_BOARD_FAILURE,
  payload: { errors }
});

export const boardChannelJoined = socketData => ({
  type: BOARD_CHANNEL_JOINED,
  payload: {
    ...socketData
  }
});

export const createListSuccess = list => ({
  type: CREATE_LIST_SUCCESS,
  payload: {
    ...list
  }
});

export const updateListSuccess = list => ({
  type: UPDATE_LIST_SUCCESS,
  payload: {
    ...list
  }
});
