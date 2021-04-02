import React from "react";
import { withRouter } from "react-router-dom";
import "./login_form.scss";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the play mode page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div className="login__input login__input--username">
          <input
            type="text"
            name="username"
            className="input"
            value={this.state.username}
            onChange={this.update("username")}
            placeholder=""
          />
          <label for="username" className="login__input__label">
            Username
          </label>
        </div>
        <div className="login__input login__input--password">
          <input
            type="password"
            className="input"
            value={this.state.password}
            onChange={this.update("password")}
            placeholder=""
          />
          <label for="password" className="login__input__label">
            Password
          </label>
        </div>
        <div className="login__btn">
          <input type="submit" value="Login" />
          {this.renderErrors()}
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);
