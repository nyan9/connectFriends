import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaGlobeAmericas, FaBackspace } from "react-icons/fa";
import "./navbar.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.getLinks = this.getLinks.bind(this);
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="nav__btn nav__btn-logout" onClick={this.props.logout}>
          <FaBackspace />
          <span>Logout</span>
          <button onClick={this.props.logout}>LOGOUT</button>
        </div>
      );
    } else {
      return (
        <div
          className="nav__btn nav__btn-login"
          onClick={() => this.props.openModal("login")}
        >
          <FaGlobeAmericas />
          <span>Login</span>
        </div>
      );
    }
  }

  render() {
    return (
      <section className="nav">
        <div className="nav__logo">LOGO HERE</div>
        <div className="nav__play">
          <Link to="/">
            <span>Play</span>
            <FaPlay className="nav__play__btn" />
          </Link>
        </div>
        {this.getLinks()}
      </section>
    );
  }
}
export default NavBar;
