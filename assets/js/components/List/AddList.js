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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  }

  setListName(e) {
    this.setState({
      list: {
        name: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createList(this.props.channel, this.state.list);
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
          <form onSubmit={this.handleSubmit}>
            <div style={{ marginBottom: "1em" }}>
              <TextField
                type="text"
                fullwidth={true}
                name="name"
                placeholder="Name"
                onInput={this.setListName.bind(this)}
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
      <div ref={this.setWrapperRef}>
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
