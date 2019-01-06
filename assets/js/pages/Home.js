import { h, render, Component } from "preact";
import Router, { route } from "preact-router";
import { Provider } from "preact-redux";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

class Home extends Component {
  handleRoute = e => {
    //   const { dispatch } = store;
    //   const { session } = store.getState();
    //   const { currentUser } = session;

    //   if (!currentUser && localStorage.getItem("phoenixAuthToken")) {
    //     dispatch(Actions.currentUser());
    //   } else if (!localStorage.getItem("phoenixAuthToken")) {
    //     route("/sign_in");
    //   }
    if (e.url !== "/sign_in" && e.url !== "/sign_up") {
      const isAuthed = false;
      if (!isAuthed) route("/sign_in", true);
    }
  };

  render({ store }) {
    return (
      <Provider store={store}>
        <Router onChange={this.handleRoute}>
          <SignInPage path="/sign_in" />
          <SignUpPage path="/sign_up" />
        </Router>
      </Provider>
    );
  }
}

export default Home;
