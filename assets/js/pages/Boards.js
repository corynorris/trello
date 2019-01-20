import { h, render, Component } from "preact";
import LayoutGrid from "preact-material-components/LayoutGrid";
import "preact-material-components/LayoutGrid/style.css";

class Board extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#6200ee",
          paddingTop: "70px"
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          Board
        </div>
      </div>
    );
  }
}

export default Board;
