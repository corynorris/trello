import {
  FETCH_CURRENT_BOARD_BEGIN,
  FETCH_CURRENT_BOARD_SUCCESS,
  FETCH_CURRENT_BOARD_FAILURE,
  CREATE_LIST_SUCCESS,
  UPDATE_LIST_SUCCESS,
  BOARD_CHANNEL_JOINED
} from "../actions/currentBoard";

const initialState = {
  loading: true,
  currentBoard: {
    name: "",
    lists: []
  },
  errors: {}
};

const currentBoard = (state = initialState, action) => {
  const { lists } = state.currentBoard;

  switch (action.type) {
    case BOARD_CHANNEL_JOINED:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_CURRENT_BOARD_BEGIN:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case FETCH_CURRENT_BOARD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case FETCH_CURRENT_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors || {}
      };
    case CREATE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBoard: {
          ...state.currentBoard,
          lists: [...lists, action.payload.list]
        },
        errors: {}
      };
    case UPDATE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBoard: {
          ...state.currentBoard,
          lists: lists.map(item => {
            if (item.id !== action.payload.list.id) {
              return item;
            } else {
              return action.payload.list;
            }
          })
        },
        errors: {}
      };
    default:
      return state;
  }
};

export default currentBoard;
