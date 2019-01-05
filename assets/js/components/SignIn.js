import { h, render, Component } from "preact";
import Card from "preact-material-components/Card";
import Icon from "preact-material-components/Icon";
import TextField from "preact-material-components/TextField";
import Button from "preact-material-components/Button";
import Avatar from "./Avatar";

import "preact-material-components/TextField/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";

class SignIn extends Component {
  render() {
    return (
      <Card style={{ padding: "1.5em" }}>
        <div
          class="card-header"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Avatar>
            <Icon style={{ color: "white" }}>lock</Icon>
          </Avatar>
          <h1>Sign In</h1>
        </div>
        <div className="card-media">
          <form>
            <div style={{ marginBottom: "2em" }}>
              <TextField label="Username" fullwidth={true} type="text" />
              <TextField label="Password" fullwidth={true} type="password" />
            </div>
            <Button style={{ width: "100%" }} outlined>
              Sign In
            </Button>
          </form>
        </div>
      </Card>
    );
  }
}

export default SignIn;
