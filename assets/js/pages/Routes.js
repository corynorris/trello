import { h, render, Component } from "preact";
import Router, { route } from "preact-router";
import { Provider } from "preact-redux";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Home from "./Home";

class Routes extends Component {
  handleRoute = e => {
    const { session } = this.props.store.getState();

    //   const { dispatch } = store;
    //   const { session } = store.getState();
    //   const { currentUser } = session;

    //   if (!currentUser && localStorage.getItem("phoenixAuthToken")) {
    //     dispatch(Actions.currentUser());
    //   } else if (!localStorage.getItem("phoenixAuthToken")) {
    //     route("/sign_in");
    //   }
    if (e.url !== "/sign_in" && e.url !== "/sign_up") {
      const isAuthed = session.signedIn;
      if (!isAuthed) route("/sign_in", true);
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
