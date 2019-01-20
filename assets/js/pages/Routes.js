import { h, render, Component } from "preact";
import Router, { route } from "preact-router";
import { Provider } from "preact-redux";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Home from "./Home";
import Board from "./Board";
import { getCurrentUser, signOutUser } from "../actions/session";
import { JWT_TOKEN } from "../constants";

class Routes extends Component {
  handleRoute = e => {
    const store = this.props.store;

    const { dispatch } = store;
    const { session } = store.getState();
    const { currentUser } = session;

    const isAuthenticated = currentUser != null;
    const canAuthenticate = localStorage.getItem(JWT_TOKEN) != null;

    if (!isAuthenticated && canAuthenticate) {
      dispatch(getCurrentUser());
    } else if (
      !isAuthenticated &&
      e.url !== "/sign_in" &&
      e.url !== "/sign_up"
    ) {
      route("/sign_in");
    } else if (e.url === "/sign_out") {
      dispatch(signOutUser());
      route("/sign_in", true);
    }
  };

  render({ store }) {
    return (
      <Provider store={store}>
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Board path="/board/:id" />
          <SignInPage path="/sign_in" />
          <SignUpPage path="/sign_up" />
        </Router>
      </Provider>
    );
  }
}

export default Routes;
