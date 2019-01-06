import { h, render } from "preact";
import "../css/app.css";
import Home from "./pages/Home";
import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import "preact-material-components/style.css";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

render(<Home store={store} />, document.getElementById("root"));
