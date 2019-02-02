import { h, render, Component } from "preact";
import { DragSource, DropTarget } from "preact-dnd";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      list_id: props.list_id,
      name: props.name,
      position: props.position
    };
  },

  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const cardTarget = {
  drop(targetProps, monitor) {
    const source = monitor.getItem();

    if (source.id !== targetProps.id) {
      const target = {
        id: targetProps.id,
        list_id: targetProps.list_id,
        name: targetProps.name,
        position: targetProps.position
      };

      targetProps.onDrop({ source, target });
    }
  }
};

@DragSource("ItemTypes.CARD", cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget("ItemTypes.CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
class ShowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingCard: false,
      editCardText: "",
      name: this.props.name || ""
    };

    // this.setCardRef = this.setCardRef.bind(this);
    // this.handleCardClick = this.handleCardClick.bind(this);
    // this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setCardRef(node) {
    this.setCardRef = node;
  }

  // handleCardClick(e) {
  //   this.setState({
  //     isEditingCard: true
  //   });
  // }

  // handleClickOutside(event) {
  //   if (this.editingCard && !this.addCardRef.contains(event.target)) {
  //     this.setState({ isEditingCard: false });
  //   }
  // }

  render({
    id,
    connectDragSource,
    connectDropTarget,
    isDragging,
    isOver,
    name,
    position
  }) {
    const basicStyle = {
      width: "calc(100% - 1px)",
      padding: "1em",
      color: "white",
      borderRadius: "3px",
      background: "rgb(98, 0, 238, 1)",
      fontSize: "1em",
      letterSpacing: "1px",
      boxShadow: "0px 1px 0px 0px #111111",
      marginBottom: "0.7em",
      display: isDragging ? "none" : "block"
    };

    const isOverStyle = {
      width: "calc(100% - 1px)",
      padding: isOver ? "1.5em" : "0em",
      color: "white",
      borderRadius: "3px",
      background: "grey",
      fontSize: "1em",
      letterSpacing: "1px",
      marginBottom: "0.7em",
      transition: isOver ? "padding 0.15s ease" : ""
    };

    return connectDragSource(
      connectDropTarget(
        // <div>
        <div id={id}>
          <div style={isOverStyle} />
          <div style={basicStyle}>
            {name} - {position} - {id}
          </div>
        </div>
      )
    );
  }
}

export default ShowCard;
