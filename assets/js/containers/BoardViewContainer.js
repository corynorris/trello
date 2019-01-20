import { h, render, Component } from "preact";
import { connect } from "preact-redux";
import { fetchBoard } from "../actions/board";

import BoardView from "../components/BoardView/BoardView";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.board
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBoard: id => {
      dispatch(fetchBoard(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardView);
