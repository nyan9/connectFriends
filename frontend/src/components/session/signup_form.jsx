import React from "react";
import { withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/game");
    }
    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
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

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul
        className={`login__errors__${
          Object.keys(this.state.errors).length === 0 ? null : "visible"
        }`}
      ></ul>
    );
  }

  render() {
    let errors = this.state.errors;
    return (
      <div className="session">
        {this.renderErrors()}
        <form className="login" onSubmit={this.handleSubmit}>
          <div className="login__inputs">
            <div className="login__input login__input--signup login__input--username">
              <input
                type="text"
                className="input"
                autocomplete="off"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder=" "
              />
              <label for="username" className="login__input__label">
                Username
              </label>
              <div className="login__errors__item">
                {errors.username ? errors.username.slice(9) : ""}
              </div>
            </div>
            <div className="login__input login__input--signup login__input--password">
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
              <div className="login__errors__item  login__errors__item--password">
                {errors.password ? errors.password.slice(9) : ""}
              </div>
            </div>
            <div className="login__input login__input--signup login__input--password">
              <input
                type="password"
                className="input"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder=" "
              />
              <label for="password" className="login__input__label">
                Confirm Password
              </label>
              <div className="login__errors__item">
                {errors.password2 ? errors.password2.slice(17) : ""}
              </div>
            </div>
          </div>
          <input
            className="login__btn login__btn--signup login__btn--login"
            type="submit"
            value="Signup"
          />
          <div className="login__btns">
            <input
              className="login__btn login__btn--other"
              type="button"
              onClick={() => this.props.openModal("login")}
              value="Login instead"
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

export default withRouter(SignupForm);
