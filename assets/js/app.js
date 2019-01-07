import { h, render } from "preact";
import "../css/app.css";
import Routes from "./pages/Routes";
import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import "preact-material-components/style.css";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

render(<Routes store={store} />, document.getElementById("root"));
