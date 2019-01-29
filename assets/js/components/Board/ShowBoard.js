import { h, render, Component } from "preact";
import { route } from "preact-router";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";

class ShowBoard extends Component {
  handleClick() {
    route(`/board/${this.props.id}`);
  }

  render({ name }) {
    return (
      <Card
        onClick={this.handleClick.bind(this)}
        style={{
          background: "white",
          padding: "1.3em",
          borderRadius: "4px",
          cursor: "pointer",
          boxShadow: "none"
        }}
      >
        <a>{name}</a>
      </Card>
    );
  }
}

export default ShowBoard;
