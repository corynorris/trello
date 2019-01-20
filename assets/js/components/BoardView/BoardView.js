import { h, render, Component } from "preact";
import LayoutGrid from "preact-material-components/LayoutGrid";
import Title from "../Headings/Title";
import "preact-material-components/LayoutGrid/style.css";

class BoardView extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchBoard(this.props.id);
  }

  render({ board }) {
    return (
      <div>
        <div style={{ paddingLeft: "25px", marginTop: "1em" }}>
          <Title>{board.name}</Title>
        </div>
        <LayoutGrid>
          <LayoutGrid.Inner>lists</LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}

export default BoardView;
