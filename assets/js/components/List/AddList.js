import { h, render, Component } from "preact";
import Button from "preact-material-components/Button";
import TextField from "preact-material-components/TextField";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/TextField/style.css";

class AddList extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      list: {}
    };
    this._renderAddForm = this._renderAddForm.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setWrapperRef = this._setWrapperRef.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
    this._setListName = this._setListName.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this._handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClickOutside);
  }

  _setWrapperRef(node) {
    this.wrapperRef = node;
  }

  _handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  }

  _setListName(e) {
    this.setState({
      list: {
        name: e.target.value
      }
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    this.props.createList(this.state.list);
    this.state = { visible: false, list: {} };
  }

  _renderAddForm() {
    return (
      <div>
        <div class="card-header">
          <h3 class=" mdc-typography--title" style={{ margin: "0em" }}>
            Add List
          </h3>
        </div>
        <Card.Media className="card-media">
          <form onSubmit={this._handleSubmit}>
            <div style={{ marginBottom: "1em" }}>
              <TextField
                type="text"
                fullwidth={true}
                name="name"
                placeholder="Name"
                onInput={this._setListName.bind(this)}
                value={this.state.list.name}
              />
            </div>
            <Button outlined>Create List</Button>
          </form>
        </Card.Media>
      </div>
    );
  }

  render() {
    return (
      <div ref={this._setWrapperRef}>
        <Card
          style={{
            background: this.state.visible ? "white" : "rgba(0, 0, 0, 0.2)",
            color: this.state.visible ? "#444" : "white",
            padding: "1.3em",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "none"
          }}
        >
          {this.state.visible ? this._renderAddForm() : "Add a New List... "}
        </Card>
      </div>
    );
  }
}

export default AddList;
