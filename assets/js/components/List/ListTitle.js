import { h, render, Component } from "preact";
import Button from "preact-material-components/Button";
import TextField from "preact-material-components/TextField";
import "preact-material-components/Button/style.css";
import "preact-material-components/TextField/style.css";

class ListTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingTitle: false,
      listName: this.props.name || ""
    };

    this.setTitleRef = this.setTitleRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleHeaderSubmit = this.handleHeaderSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setTitleRef(node) {
    this.headerRef = node;
  }

  handleClickOutside(event) {
    if (this.headerRef && !this.headerRef.contains(event.target)) {
      this.setState({ isEditingTitle: false });
    }

    if (this.editingCard && !this.addCardRef.contains(event.target)) {
      this.setState({ isEditingCard: false });
    }
  }

  setListName(e) {
    this.setState({
      listName: e.target.value
    });
  }

  handleHeaderSubmit(e) {
    e.preventDefault();
    this.props.updateTitle(this.state.listName);

    this.setState({ isEditingTitle: false });
  }

  handleHeaderClick(e) {
    this.setState({
      isEditingTitle: true
    });
  }

  render({ name }) {
    if (!this.state.isEditingTitle) {
      return (
        <div
          ref={this.setHeaderRef}
          onClick={this.handleHeaderClick}
          className="card-header"
          style={{ paddingBottom: "1.0em" }}
        >
          <h3
            className="mdc-typography--title"
            style={{ margin: "0em", fontFamily: "Roboto, sans-serif" }}
          >
            {name}
          </h3>
        </div>
      );
    } else {
      return (
        <div
          className="card-header"
          ref={this.setTitleRef}
          style={{ paddingBottom: "0em" }}
        >
          <form onSubmit={this.handleHeaderSubmit}>
            <div style={{ marginBottom: "-0.1em" }}>
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
                value={this.state.listName}
                outlined={false}
              />
            </div>
            <Button>Save</Button>
          </form>
        </div>
      );
    }
  }
}

export default ListTitle;
