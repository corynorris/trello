import { h, render, Component } from "preact";
import Router, { route } from "preact-router";
import { Provider } from "preact-redux";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Home from "./Home";
import { getCurrentUser, signOutUser } from "../actions";
import { JWT_TOKEN } from "../constants";

class Routes extends Component {
  handleRoute = e => {
    const store = this.props.store;

    const { dispatch } = store;
    const { session } = store.getState();
    const { currentUser } = session;

    if (e.url === "/sign_out") {
      dispatch(signOutUser());
      route("/sign_in", true);
    } else if (!currentUser && localStorage.getItem(JWT_TOKEN)) {
      // They have a token so we can sign them in
      dispatch(getCurrentUser());
    } else if (!localStorage.getItem(JWT_TOKEN)) {
      // No token, and not signed in
      if (e.url !== "/sign_in" && e.url !== "/sign_up") route("/sign_in");
    }
  };

  render({ store }) {
    return (
      <Provider store={store}>
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <SignInPage path="/sign_in" />
          <SignUpPage path="/sign_up" />
        </Router>
      </Provider>
    );
  }
}

export default Routes;
