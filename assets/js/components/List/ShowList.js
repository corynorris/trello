import { h, render, Component } from "preact";
import { DragSource, DropTarget } from "preact-dnd";
import AddCard from "../Card/AddCard";
import ListCards from "../Card/ListCards";
import ListTitle from "../List/ListTitle";

import "preact-material-components/Button/style.css";
import "preact-material-components/TextField/style.css";

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      position: props.position
    };
  },

  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const listTarget = {
  drop(targetProps, monitor) {
    const source = monitor.getItem();

    if (source.id !== targetProps.id) {
      const target = {
        id: targetProps.id,
        name: targetProps.name,
        position: targetProps.position
      };

      targetProps.onDrop({ source, target });
    }
  }
};

const cardTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    const source = {
      id: sourceProps.id,
      list_id: targetProps.id,
      position: 0
    };

    if (!targetProps.cards.length) {
      targetProps.onDropCardWhenEmpty(source);
    }
  }
};
@DragSource("ItemTypes.LIST", listSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget("ItemTypes.LIST", listTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DropTarget("ItemTypes.CARD", cardTarget, connect => ({
  connectCardDropTarget: connect.dropTarget()
}))
class ShowList extends Component {
  constructor(props) {
    super(props);
    this._handleCreateCard = this._handleCreateCard.bind(this);
    this._handleDropCard = this._handleDropCard.bind(this);
    this._handleUpdateTitle = this._handleUpdateTitle.bind(this);
  }

  _handleDropCard({ source, target }) {
    this.props.onDropCard({ source, target });
  }

  _handleCreateCard(cardName) {
    this.props.createCard(this.props.channel, {
      list_id: this.props.id,
      name: cardName,
      position: this.props.cards.length || 0
    });
  }

  _handleUpdateTitle(listName) {
    this.props.updateList(this.props.channel, {
      id: this.props.id,
      name: listName
    });
  }

  render({
    id,
    name,
    cards,
    connectDragSource,
    connectDropTarget,
    connectCardDropTarget,
    isDragging
  }) {
    return connectDragSource(
      connectDropTarget(
        connectCardDropTarget(
          <div id={id}>
            <div
              style={{
                background: "white",
                color: "#444",
                padding: "1.0em 1.3em",
                borderRadius: "4px",
                boxShadow: "none",
                opacity: isDragging ? 0.7 : 1
              }}
            >
              <ListTitle name={name} updateTitle={this._handleUpdateTitle} />
              <ListCards cards={cards} handleDropCard={this._handleDropCard} />
              <AddCard createCard={this._handleCreateCard} />
            </div>
          </div>
        )
      )
    );
  }
}

export default ShowList;
