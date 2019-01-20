import { h, render, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";

class BoardCard extends Component {
  render({ name }) {
    return (
      <Card
        style={{
          background: "white",
          padding: "1.3em",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {name}
      </Card>
    );
  }
}

export default BoardCard;
