import { h, render, Component } from "preact";

class ShowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingCard: false,
      editCardText: "",
      name: this.props.name || ""
    };

    this.setCardRef = this.setCardRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
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

  handleCardClick(e) {
    this.setState({
      isEditingCard: true
    });
  }

  handleClickOutside(event) {
    if (this.editingCard && !this.addCardRef.contains(event.target)) {
      this.setState({ isEditingCard: false });
    }
  }

  render({ id, name }) {
    return (
      <div
        ref={this.setCardRef}
        id={id}
        onClick={this.handleCardClick}
        style={{
          width: "calc(100% - 1px)",
          padding: "1em",
          color: "white",
          borderRadius: "3px",
          background: "rgb(98, 0, 238, 1)",
          fontSize: "1em",
          letterSpacing: "1px",
          boxShadow: "0px 1px 0px 0px #111111",
          marginBottom: "0.7em"
        }}
      >
        {name}
      </div>
    );
  }
}

export default ShowCard;
