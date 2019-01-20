import { h, render, Component } from "preact";
import Header from "../components/Header/Header";
import BoardViewContainer from "../containers/BoardViewContainer";

class Home extends Component {
  render({ id }) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#6200ee"
        }}
      >
        <Header />
        <div style={{ color: "white", paddingTop: "4em" }}>
          <BoardViewContainer id={id} />
        </div>
      </div>
    );
  }
}

export default Home;
