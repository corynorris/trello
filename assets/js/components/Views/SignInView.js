import { h, render, Component } from "preact";
import Card from "preact-material-components/Card";
import Icon from "preact-material-components/Icon";
import TextField from "preact-material-components/TextField";
import Button from "preact-material-components/Button";
import Avatar from "../Avatar/Avatar";

import "preact-material-components/TextField/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";

class SignInView extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signInRequest(this.state);
  }

  render({ loading, errors }) {
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
        <Card.Media className="card-media">
          <form onSubmit={this.handleSubmit}>
            <div style={{ marginBottom: "2em" }}>
              <TextField
                disabled={loading}
                name="email"
                placeholder="Email"
                dense={true}
                onChange={this.handleChange.bind(this)}
                value={this.state.email}
                fullwidth={true}
                valid={errors.email ? false : true}
                helperText={errors.email}
                helperTextValidationMsg={true}
                type="email"
              />
              <TextField
                disabled={loading}
                name="password"
                placeholder="Password"
                onChange={this.handleChange.bind(this)}
                value={this.state.password}
                fullwidth={true}
                valid={errors.password ? false : true}
                helperText={errors.password}
                helperTextValidationMsg={true}
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
        </Card.Media>
      </Card>
    );
  }
}

export default SignInView;
