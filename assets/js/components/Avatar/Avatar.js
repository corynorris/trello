import { h, render, Component } from "preact";

class Avatar extends Component {
  render({ children }) {
    return (
      <div
        style={{
          width: "3em",
          height: "3em",
          borderRadius: "50%",
          background: "rgb(98, 0, 238)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {children}
      </div>
    );
  }
}

export default Avatar;
