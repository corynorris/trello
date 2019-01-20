import { h, render, Component } from "preact";
import { connect } from "preact-redux";
import { createBoard, fetchBoards } from "../actions/boards";

import BoardList from "../components/BoardList/BoardList";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.boards
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createBoard: boardName => {
      dispatch(createBoard(boardName));
    },
    fetchBoards: () => {
      dispatch(fetchBoards());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardList);
