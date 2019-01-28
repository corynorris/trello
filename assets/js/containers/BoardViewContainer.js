import { h, render, Component } from "preact";
import { connect } from "preact-redux";
import { connectToChannel } from "../actions/currentBoard";
import { createList, updateList } from "../actions/lists";
import { createCard, updateCard } from "../actions/cards";

import BoardView from "../components/BoardView/BoardView";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.currentBoard,
    session: state.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectToChannel: (socket, id) => {
      dispatch(connectToChannel(socket, id));
    },
    createList: (channel, name) => {
      dispatch(createList(channel, name));
    },
    updateList: (channel, name) => {
      dispatch(updateList(channel, name));
    },
    createCard: (channel, name) => {
      dispatch(createCard(channel, name));
    },
    updateCard: (channel, name) => {
      dispatch(updateCard(channel, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardView);
