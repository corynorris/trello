import { h, render, Component } from "preact";
import LayoutGrid from "preact-material-components/LayoutGrid";
import Title from "../Headings/Title";
import AddList from "./AddList";
import "preact-material-components/LayoutGrid/style.css";
import LinearProgress from "preact-material-components/LinearProgress";
import "preact-material-components/LinearProgress/style.css";
import ListCard from "./ListCard";

class BoardView extends Component {
  componentDidMount() {
    const { socket } = this.props.session;
    if (!socket) {
      return false;
    }
    this.props.connectToChannel(socket, this.props.id);
  }

  componentWillUpdate(nextProps, nextState) {
    const { socket } = this.props.session;
    const { currentBoard } = nextProps;

    if (currentBoard.name !== undefined) document.title = currentBoard.name;

    if (socket) {
      return false;
    }

    this.props.connectToChannel(nextProps.session.socket, this.props.id);
  }

  render({ loading, currentBoard: { name, lists } }) {
    let Lists = lists.map(list => (
      <div
        style={{ width: "100px", flex: "0 0 17em", margin: "0 0.66667em 0 0" }}
        key={list.id}
      >
        <ListCard
          updateList={this.props.updateList}
          createCard={this.props.createCard}
          updateCard={this.props.updateCard}
          channel={this.props.boardChannel}
          list={list}
        />
      </div>
    ));

    // loading = true;
    if (loading) {
      return <LinearProgress indeterminate />;
    }

    return (
      <div
        style={{
          // height: "calc(100% - 1em)",
          padding: "1em",
          height: "100%"
        }}
      >
        <div style={{ margin: "0em 0em 1em 0em " }}>
          <Title>{name}</Title>
        </div>
        <div
          style={{
            height: "calc(100% - 2em )",
            // height: "100%",
            display: "flex",
            "overflow-y": "hidden",
            "overflow-x": "scroll"
          }}
        >
          {Lists}
          <div
            style={{
              width: "100px",
              flex: "0 0 17em",
              margin: "0 0.66667em 0 0"
            }}
          >
            <AddList
              createList={this.props.createList}
              channel={this.props.boardChannel}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BoardView;
