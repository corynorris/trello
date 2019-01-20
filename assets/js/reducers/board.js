import {
  FETCH_BOARD_BEGIN,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_FAILURE
} from "../actions/board";

const initialState = {
  loading: false,
  board: {},
  errors: {}
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARD_BEGIN:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case FETCH_BOARD_SUCCESS:
      return {
        ...state,
        board: action.payload.board,
        loading: false
      };
    case FETCH_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors || {}
      };
    default:
      return state;
  }
};

export default board;
