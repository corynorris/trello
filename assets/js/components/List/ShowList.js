import { h, render, Component } from "preact";
import AddCard from "../Card/AddCard";
import ListCards from "../Card/ListCards";
import ListTitle from "../List/ListTitle";
import { DragSource, DropTarget } from "preact-dnd";

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
@DragSource("ItemTypes.LIST", listSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget("ItemTypes.LIST", listTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
class ShowList extends Component {
  handleCreateCard(cardName) {
    this.props.createCard(this.props.channel, {
      list_id: this.props.id,
      name: cardName
    });
  }
  handleUpdateTitle(listName) {
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
    isDragging
  }) {
    return connectDragSource(
      connectDropTarget(
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
            <ListTitle
              name={name}
              updateTitle={this.handleUpdateTitle.bind(this)}
            />
            <ListCards cards={cards} />
            <AddCard createCard={this.handleCreateCard.bind(this)} />
          </div>
        </div>
      )
    );
  }
}

export default ShowList;
