import { h, render, Component } from "preact";
import SignUpContainer from "../containers/SignUpContainer";

class SignUpPage extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#6200ee",
          paddingTop: "70px"
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <SignUpContainer />
        </div>
      </div>
    );
  }
}

export default SignUpPage;
