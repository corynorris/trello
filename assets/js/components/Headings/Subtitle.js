import { h, render, Component } from "preact";

class Subtitle extends Component {
  render({ children }) {
    return <h4 style={{ color: "white", marginTop: "0.5em" }}>{children}</h4>;
  }
}

export default Subtitle;
