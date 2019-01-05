// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import "preact-material-components/style.css";

import { h, render, Component } from "preact";
import Router from "preact-router";

import { Provider, connect } from "preact-redux";
import Home from "./routes/Home";
import About from "./routes/About";
import store from "./store";
const Main = () => (
  <Provider store={store}>
    <Router>
      <Home path="/" />
      <About path="/about" />
    </Router>
  </Provider>
);

render(<Main />, document.getElementById("root"));
