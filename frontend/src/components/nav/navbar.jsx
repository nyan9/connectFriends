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

      if (!this.props.user){
        {this.props.getUser(this.props.currentUser.username)}
      }

      return (
        <div className="nav__btn nav__btn-logout" onClick={this.props.logout}>
          <FaBackspace />
          <span>Logout</span>
          <button onClick={this.props.logout}>LOGOUT</button>
          <div key={this.props.user.elo}>{this.props.user.elo}</div>
          <div>{this.props.user.username}</div>
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


