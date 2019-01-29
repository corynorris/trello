import { h, render, Component } from "preact";
import { connect } from "preact-redux";
import { createBoard, fetchBoards } from "../actions/boards";

import BoardListView from "../components/Views/BoardListView";

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
)(BoardListView);
