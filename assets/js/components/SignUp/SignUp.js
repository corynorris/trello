import { h, render, Component } from "preact";
import Card from "preact-material-components/Card";
import Icon from "preact-material-components/Icon";
import TextField from "preact-material-components/TextField";
import Button from "preact-material-components/Button";
import Avatar from "../Avatar/Avatar";
import FormField from "preact-material-components/FormField";

import "preact-material-components/TextField/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/FormField/style.css";

class SignUp extends Component {
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
    this.props.signUpRequest(this.state);
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
            <Icon style={{ color: "white" }}>person_add</Icon>
          </Avatar>
          <h1>Sign Up</h1>
        </div>
        <div className="card-media">
          <form onSubmit={this.handleSubmit} style="error">
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
                name="first_name"
                placeholder="First Name"
                onChange={this.handleChange.bind(this)}
                value={this.state.first_name}
                fullwidth={true}
                valid={errors.first_name ? false : true}
                helperText={errors.first_name}
                helperTextValidationMsg={true}
                type="text"
              />
              <TextField
                disabled={loading}
                name="last_name"
                placeholder="Last Name"
                onChange={this.handleChange.bind(this)}
                value={this.state.last_name}
                fullwidth={true}
                valid={errors.last_name ? false : true}
                helperText={errors.last_name}
                helperTextValidationMsg={true}
                type="text"
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
              <TextField
                disabled={loading}
                name="password_confirmation"
                placeholder="Password Confirmation"
                onChange={this.handleChange.bind(this)}
                value={this.state.password_confirmation}
                fullwidth={true}
                valid={errors.password_confirmation ? false : true}
                helperText={errors.password_confirmation}
                helperTextValidationMsg={true}
                type="password"
              />
            </div>
            <Button disabled={loading} style={{ width: "100%" }} raised>
              Sign Up
            </Button>
          </form>
          <Button style={{ width: "100%", fontSize: "12px" }} href="/sign_in">
            I already have an account
          </Button>
        </div>
      </Card>
    );
  }
}

export default SignUp;
