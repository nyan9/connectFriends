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
    this.handleDemo = this.handleDemo.bind(this);
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

  randomUsername() {
    return `demo_user${Math.floor(Math.random() * 10000)}`;
  }

  handleDemo(e) {
    e.preventDefault();

    let randUsername = this.randomUsername();
    let user;

    if (this.props.checkUsername(randUsername)) {
      user = {
        username: randUsername,
        password: randUsername,
        password2: randUsername,
      };
      this.props.signup(user);
    } else {
      this.randomUsername();
    }
  }

  // Render the session errors if there are any
  renderErrors() {
    console.log(this.state.errors);
    return (
      <ul
        className={`login__errors__${
          Object.keys(this.state.errors).length === 0 ? null : "visible"
        }`}
      ></ul>
    );
  }

  render() {
    return (
      <div className="session">
        {this.renderErrors()}
        <form className="login" onSubmit={this.handleSubmit}>
          <div className="login__input login__input--username">
            <input
              type="text"
              name="username"
              className="input"
              autoComplete="nope"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder=" "
            />
            <label for="username" className="login__input__label">
              Username
            </label>
          </div>
          <div className="login__errors__item">
            {this.state.errors.username}
          </div>
          <div className="login__input login__input--password">
            <input
              type="password"
              className="input"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder=" "
            />
            <label for="password" className="login__input__label">
              Password
            </label>
          </div>
          <div className="login__errors__item">
            {this.state.errors.password}
          </div>
          <input
            className="login__btn login__btn--login"
            type="submit"
            value="Login"
          />
          <div className="login__btns">
            <input
              className="login__btn login__btn--other"
              type="button"
              onClick={() => this.props.openModal("signup")}
              value="Create an account"
            />
            <input
              className="login__btn login__btn--demo"
              type="button"
              onClick={this.handleDemo}
              value="Login as demo user"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
