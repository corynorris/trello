import { h, render, Component } from "preact";
import Header from "../components/Header/Header";
import BoardListContainer from "../containers/BoardListContainer";

class Home extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",

          background: "#6200ee"
        }}
      >
        <Header />
        <div
          style={{
            paddingTop: "49px"
          }}
        >
          <BoardListContainer />
        </div>
      </div>
    );
  }
}

export default Home;
