import { h, render, Component } from "preact";
import { route } from "preact-router";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";

class BoardCard extends Component {
  handleClick() {
    route(`/board/${this.props.id}`);
  }

  render({ id, name }) {
    return (
      <Card
        onClick={this.handleClick.bind(this)}
        style={{
          background: "white",
          // background: "rgba(255, 255, 255, 0.95)",
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

export default BoardCard;
