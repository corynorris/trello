import { h, render, Component } from "preact";
import Title from "../Headings/Title";
import AddList from "../List/AddList";
import ShowList from "../List/ShowList";
import LinearProgress from "preact-material-components/LinearProgress";

import { DragDropContext } from "preact-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "preact-material-components/LayoutGrid/style.css";
import "preact-material-components/LinearProgress/style.css";
@DragDropContext(HTML5Backend)
class BoardView extends Component {
  constructor(props) {
    super(props);
    this._handleDropList = this._handleDropList.bind(this);
    this._handleCreateList = this._handleCreateList.bind(this);
  }
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

  _handleDropList({ source, target }) {
    const { lists } = this.props.currentBoard;
    const { boardChannel } = this.props;

    const sourceListIndex = lists.findIndex(list => {
      return list.id === source.id;
    });

    const targetListIndex = lists.findIndex(list => {
      return list.id === target.id;
    });

    const sourceList = lists[sourceListIndex];
    lists.splice(sourceListIndex, 1);

    lists.splice(targetListIndex, 0, sourceList);

    lists.forEach((list, idx) => {
      list.position = idx;
      this.props.updateList(boardChannel, list);
    });
  }

  _handleCreateList(list) {
    const { lists } = this.props.currentBoard;
    this.props.createList(this.props.boardChannel, {
      ...list,
      position: lists.length
    });
  }

  render({ loading, currentBoard: { name, lists } }) {
    let Lists = lists
      .sort((a, b) => a.position - b.position)
      .map(list => (
        <div
          style={{
            width: "100px",
            flex: "0 0 17em",
            margin: "0 0.66667em 0 0"
          }}
          key={list.id}
        >
          <ShowList
            updateList={this.props.updateList}
            createCard={this.props.createCard}
            updateCard={this.props.updateCard}
            channel={this.props.boardChannel}
            onDrop={this._handleDropList}
            {...list}
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
          padding: "1em 1.7em",
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
            <AddList createList={this._handleCreateList} />
          </div>
        </div>
      </div>
    );
  }
}

export default BoardView;
