import { h, render, Component } from "preact";
import { connect } from "preact-redux";
import { signIn } from "../actions";

import SignIn from "../components/SignIn";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signIn: () => {
      dispatch(signIn(false));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
