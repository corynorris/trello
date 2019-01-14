import { h, render, Component } from "preact";
import { connect } from "preact-redux";
import { signUp } from "../actions/signup";

import SignUp from "../components/SignUp";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.signUp
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUpRequest: userData => {
      dispatch(signUp(userData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
