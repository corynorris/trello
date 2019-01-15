import { h, render, Component } from "preact";
import Header from "../components/Header";
class Home extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%"
          // background: "rgb(99, 0, 234)"
          // background: "#8f3dfe"
        }}
      >
        <Header />
        <div style={{ padding: "6.5em" }}>HELLO AND WELCOME</div>
      </div>
    );
  }
}

export default Home;
