import { h, render, Component } from "preact";
import Button from "preact-material-components/Button";
import TextField from "preact-material-components/TextField";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/TextField/style.css";

class ListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingTitle: false,
      isEditingCard: false,
      isAddingCard: false,
      name: this.props.list.name || "",
      card: ""
    };

    this.setHeaderRef = this.setHeaderRef.bind(this);
    this.setAddCardRef = this.setAddCardRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderCards = this._renderCards.bind(this);
    this._renderAddCard = this._renderAddCard.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleHeaderSubmit = this.handleHeaderSubmit.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleAddCardClick = this.handleAddCardClick.bind(this);
    this.handleAddCardSubmit = this.handleAddCardSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setHeaderRef(node) {
    this.headerRef = node;
  }

  setAddCardRef(node) {
    this.addCardRef = node;
  }

  handleClickOutside(event) {
    if (this.headerRef && !this.headerRef.contains(event.target)) {
      this.setState({ isEditingTitle: false });
    }

    if (this.addCardRef && !this.addCardRef.contains(event.target)) {
      this.setState({ isAddingCard: false });
    }

    if (this.editingCard && !this.addCardRef.contains(event.target)) {
      this.setState({ isEditingCard: false });
    }
  }

  setListName(e) {
    this.setState({
      name: e.target.value
    });
  }

  setCardValue(e) {
    this.setState({
      card: e.target.value
    });
  }

  handleHeaderSubmit(e) {
    e.preventDefault();
    this.props.updateList(this.props.channel, {
      ...this.props.list,
      name: this.state.name
    });
    this.setState({ isEditingTitle: false });
  }

  handleHeaderClick(e) {
    this.setState({
      isEditingTitle: true
    });
  }

  handleAddCardSubmit(e) {
    e.preventDefault();
    this.props.createCard(this.props.channel, {
      name: this.state.card,
      list_id: this.props.list.id
    });

    this.setState({ isAddingCard: false, card: "" });
  }

  handleAddCardClick(e) {
    this.setState({
      isAddingCard: true
    });
  }

  handleCardClick(e) {
    this.setState({
      isEditingCard: true
    });
  }

  _renderHeader() {
    if (!this.state.isEditingTitle) {
      return (
        <div
          ref={this.setHeaderRef}
          onClick={this.handleHeaderClick}
          className="card-header"
          style={{ paddingBottom: "1.5em" }}
        >
          <h3
            className="mdc-typography--title"
            style={{ margin: "0em", fontFamily: "Roboto, sans-serif" }}
          >
            {this.props.list.name}
          </h3>
        </div>
      );
    } else {
      return (
        <div
          className="card-header"
          ref={this.setHeaderRef}
          style={{ paddingBottom: "0em" }}
        >
          <form onSubmit={this.handleHeaderSubmit}>
            <div style={{ marginBottom: "0em" }}>
              <TextField
                type="text"
                className="mdc-typography--title"
                outerStyle={{
                  height: "26px"
                }}
                style={{
                  fontSize: "1.17em",
                  fontWeight: "bold",
                  color: "rgb(68, 68, 68)"
                }}
                fullwidth={true}
                name="name"
                onInput={this.setListName.bind(this)}
                value={this.state.name}
                outlined={false}
              />
            </div>
            <Button>Update</Button>
          </form>
        </div>
      );
    }
  }

  _renderCards() {
    const cards = this.props.list.cards || [];
    const carList = cards.map(card => (
      <div
        id={card.id}
        onClick={this.handleCardClick}
        style={{
          width: "100%",
          padding: "1em",
          background: "rgba(0, 0, 0, 0.1)",
          marginBottom: "0.5em"
        }}
      >
        {card.name}
      </div>
    ));

    return <div>{carList}</div>;
  }

  _renderAddCard() {
    if (this.state.isAddingCard) {
      return (
        <div ref={this.setAddCardRef}>
          <form onSubmit={this.handleAddCardSubmit}>
            <div style={{ marginBottom: "1em" }}>
              <TextField
                type="text"
                className="mdc-typography--title"
                textarea={true}
                name="card"
                onInput={this.setCardValue.bind(this)}
                value={this.state.card}
              />
            </div>
            <Button>Add Card</Button>
          </form>
        </div>
      );
    } else {
      return (
        <div
          ref={this.setAddCardRef}
          onClick={this.handleAddCardClick}
          style={{
            width: "100%",
            padding: "1em",
            background: "rgba(0, 0, 0, 0.1)",
            marginBottom: "0.5em"
          }}
        >
          Add Card...
        </div>
      );
    }
  }

  render() {
    return (
      <div onClick={this.handleCardClick}>
        <Card
          style={{
            background: "white",
            color: "#444",
            padding: "1.3em",
            borderRadius: "4px",
            boxShadow: "none"
          }}
        >
          {this._renderHeader()}
          <Card.Media>
            {this._renderCards()}
            {this._renderAddCard()}
          </Card.Media>
        </Card>
      </div>
    );
  }
}

export default ListCard;
