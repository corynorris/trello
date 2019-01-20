import { h, render, Component } from "preact";
import LayoutGrid from "preact-material-components/LayoutGrid";
import AddBoard from "./AddBoard";
import BoardCard from "./BoardCard";
import "preact-material-components/LayoutGrid/style.css";

class BoardList extends Component {
  componentDidMount() {
    console.log("fetching boards");
    this.props.fetchBoards();
  }

  render({ boards }) {
    let boardGrid = boards.map(board => (
      <LayoutGrid.Cell cols="3" key={board.id}>
        <BoardCard name={board.name} />
      </LayoutGrid.Cell>
    ));

    return (
      <LayoutGrid>
        <LayoutGrid.Inner>
          {boardGrid}
          <LayoutGrid.Cell cols="3">
            <AddBoard createBoard={this.props.createBoard} />
          </LayoutGrid.Cell>
        </LayoutGrid.Inner>
      </LayoutGrid>
    );
  }
}

export default BoardList;
