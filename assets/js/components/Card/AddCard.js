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

    this._renderAddCardButton = this._renderAddCardButton.bind(this);
    this._renderAddCardForm = this._renderAddCardForm.bind(this);

    this._setAddCardRef = this._setAddCardRef.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);

    this._handleAddCardClick = this._handleAddCardClick.bind(this);
    this._handleAddCardSubmit = this._handleAddCardSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this._handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClickOutside);
  }

  _handleClickOutside(event) {
    if (this.addCardRef && !this.addCardRef.contains(event.target)) {
      this.setState({ isAddingCard: false });
    }
  }

  _handleAddCardClick(e) {
    this.setState({
      isAddingCard: true
    });
  }

  _handleAddCardSubmit(e) {
    e.preventDefault();
    this.props.createCard(this.state.addCardText);
    this.setState({ isAddingCard: false, addCardText: "" });
  }

  setCardValue(e) {
    this.setState({
      addCardText: e.target.value
    });
  }

  _setAddCardRef(node) {
    this.addCardRef = node;
  }

  _renderAddCardButton() {
    return (
      <div
        onclick={this._handleAddCardClick}
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
      <div ref={this._setAddCardRef}>
        <form
          style={{ marginBottom: "-0.5em" }}
          onSubmit={this._handleAddCardSubmit}
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
          <Button>Add Card</Button>
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
