import { h, render, Component } from "preact";
import Button from "preact-material-components/Button";
import TextField from "preact-material-components/TextField";
import "preact-material-components/Button/style.css";
import "preact-material-components/TextField/style.css";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingCard: false,
      addCardText: ""
    };

    this.setAddCardRef = this.setAddCardRef.bind(this);
    this._renderAddCardButton = this._renderAddCardButton.bind(this);
    this._renderAddCardForm = this._renderAddCardForm.bind(this);

    this.setAddCardRef = this.setAddCardRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.handleAddCardClick = this.handleAddCardClick.bind(this);
    this.handleAddCardSubmit = this.handleAddCardSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.addCardRef && !this.addCardRef.contains(event.target)) {
      this.setState({ isAddingCard: false });
    }
  }

  handleAddCardClick(e) {
    this.setState({
      isAddingCard: true
    });
  }

  handleAddCardSubmit(e) {
    e.preventDefault();
    this.props.createCard(this.props.channel, {
      name: this.state.addCardText,
      list_id: this.props.list.id
    });

    this.setState({ isAddingCard: false, addCardText: "" });
  }

  setCardValue(e) {
    this.setState({
      addCardText: e.target.value
    });
  }

  setAddCardRef(node) {
    this.addCardRef = node;
  }

  _renderAddCardButton() {
    return (
      <div
        onclick={this.handleAddCardClick}
        style={{
          width: "100%",
          padding: "0.5em 0.5em 0.0em 0.5em",
          background: "rgba(0, 0, 0, 0.0)"
        }}
      >
        Add Card...
      </div>
    );
  }

  _renderAddCardForm() {
    return (
      <div ref={this.setAddCardRef}>
        <form
          style={{ marginBottom: "-0.5em" }}
          onSubmit={this.handleAddCardSubmit}
        >
          <div style={{ marginBottom: "0em" }}>
            <TextField
              type="text"
              className="mdc-typography--title"
              textarea={true}
              name="card"
              onInput={this.setCardValue.bind(this)}
              value={this.state.addCardText}
            />
          </div>
          <Button style={{}}>Add Card</Button>
        </form>
      </div>
    );
  }

  render() {
    return this.state.isAddingCard
      ? this._renderAddCardForm()
      : this._renderAddCardButton();
  }
}

export default AddCard;
