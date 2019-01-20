import { h, render, Component } from "preact";
import Header from "../components/Header";
import BoardListContainer from "../containers/BoardListContainer";

class Home extends Component {
  render() {
    let boards = [
      { id: 1, name: "test 1" },
      { id: 2, name: "test 2" },
      { id: 3, name: "test 3" },
      { id: 7, name: "test 3" },
      { id: 6, name: "test 3" },
      { id: 4, name: "test 3" }
    ];
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#6200ee"
          // background: "white"
        }}
      >
        <Header />
        <div style={{ paddingTop: "4em" }}>
          <BoardListContainer />
        </div>
      </div>
    );
  }
}

export default Home;
