import { h, render, Component } from "preact";
import LayoutGrid from "preact-material-components/LayoutGrid";
import AddBoard from "./AddBoard";
import Title from "../Headings/Title";
import BoardCard from "./BoardCard";
import "preact-material-components/LayoutGrid/style.css";
import LinearProgress from "preact-material-components/LinearProgress";
import "preact-material-components/LinearProgress/style.css";
class BoardList extends Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  render({ boards, loading }) {
    let boardGrid = boards.map(board => (
      <LayoutGrid.Cell cols="3" key={board.id}>
        <BoardCard {...board} />
      </LayoutGrid.Cell>
    ));

    if (loading) {
      return <LinearProgress indeterminate />;
    }

    return (
      <div>
        <div style={{ margin: "1em 1em 0 1em " }}>
          <Title>My Boards</Title>
        </div>
        <LayoutGrid>
          <LayoutGrid.Inner>
            {boardGrid}
            <LayoutGrid.Cell cols="3">
              <AddBoard createBoard={this.props.createBoard} />
            </LayoutGrid.Cell>
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}

export default BoardList;
