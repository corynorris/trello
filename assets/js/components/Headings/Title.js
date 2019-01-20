import { h, render, Component } from "preact";

class Title extends Component {
  render({ children }) {
    return <h3 style={{ color: "white", margin: "0px" }}>{children}</h3>;
  }
}

export default Title;
