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
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.signIn(this.state);
  }

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
          <form onSubmit={this.handleSubmit}>
            <div style={{ marginBottom: "2em" }}>
              <TextField
                name="email"
                placeholder="Email"
                onChange={this.onChange}
                fullwidth={true}
                type="text"
              />
              <TextField
                name="password"
                placeholder="Password"
                onChange={this.onChange}
                fullwidth={true}
                type="password"
              />
            </div>
            <Button style={{ width: "100%" }} raised>
              Sign In
            </Button>
          </form>
          <Button style={{ width: "100%", fontSize: "12px" }} href="/sign_up">
            create an account
          </Button>
        </div>
      </Card>
    );
  }
}

export default SignIn;
