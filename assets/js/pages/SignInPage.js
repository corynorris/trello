import { h, render, Component } from "preact";
import SignIn from "../components/SignIn";

class SignInPage extends Component {
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
          <SignIn />
        </div>
      </div>
    );
  }
}

export default SignInPage;
