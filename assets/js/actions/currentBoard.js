import axios from "axios";
import { JWT_TOKEN } from "../constants";

export const BOARD_CHANNEL_JOINED = "BOARD_CHANNEL_JOINED";
export const FETCH_CURRENT_BOARD_BEGIN = "FETCH_CURRENT_BOARD_BEGIN";
export const FETCH_CURRENT_BOARD_SUCCESS = "FETCH_CURRENT_BOARD_SUCCESS";
export const FETCH_CURRENT_BOARD_FAILURE = "FETCH_CURRENT_BOARD_FAILURE";
export const CREATE_LIST_SUCCESS = "CREATE_LIST_SUCCESS";
export const UPDATE_LIST_SUCCESS = "UPDATE_LIST_SUCCESS";
export const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";

export function connectToChannel(socket, id) {
  return dispatch => {
    const channel = socket.channel(`boards:${id}`);
    dispatch(fetchCurrentBoardBegin());

    channel.join().receive("ok", response => {
      dispatch(fetchCurrentBoardSuccess(response.board));
    });

    channel.on("list:created", list => {
      dispatch(createListSuccess(list));
    });

    channel.on("list:updated", list => {
      dispatch(updateListSuccess(list));
    });

    channel.on("card:created", card => {
      dispatch(createCardSuccess(card));
    });

    channel.on("card:updated", card => {
      dispatch(updateCardSuccess(card));
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

export const createCardSuccess = card => ({
  type: CREATE_CARD_SUCCESS,
  payload: {
    ...card
  }
});

export const updateCardSuccess = card => ({
  type: UPDATE_CARD_SUCCESS,
  payload: {
    ...card
  }
});
