import { h, render, Component } from "preact";
import Router, { route } from "preact-router";
import { Provider } from "preact-redux";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Home from "./Home";
import Board from "./Board";
import {
  getCurrentUser,
  setCurrentUser,
  signOutUser
} from "../actions/session";
import { JWT_TOKEN } from "../constants";

const BASE = process.env.PUBLIC_URL || "";

class Routes extends Component {
  handleRoute = e => {
    const store = this.props.store;

    const { dispatch } = store;
    const { session } = store.getState();
    const { currentUser } = session;

    const isAuthenticated = currentUser != null;
    const canAuthenticate = localStorage.getItem(JWT_TOKEN) != null;

    if (e.url === `${BASE}/sign_out`) {
      dispatch(signOutUser());
      route(`${BASE}/sign_in`, true);
    } else if (!isAuthenticated && canAuthenticate) {
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
      } else {
        dispatch(getCurrentUser());
      }
    } else if (
      !isAuthenticated &&
      e.url !== `${BASE}/sign_in` &&
      e.url !== `${BASE}/sign_up`
    ) {
      route(`${BASE}/sign_in`, true);
    }
  };

  render({ store }) {
    return (
      <Provider store={store}>
        <Router onChange={this.handleRoute}>
          <Home path={`${BASE}/`} />
          <Board path={`${BASE}/board/:id`} />
          <SignInPage path={`${BASE}/sign_in`} />
          <SignUpPage path={`${BASE}/sign_up`} />
        </Router>
      </Provider>
    );
  }
}

export default Routes;
