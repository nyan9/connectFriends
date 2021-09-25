import React from "react";
import { Link } from "react-router-dom";

import {
  FaPlay,
  FaGlobeAmericas,
  FaBackspace,
  FaUserCircle,
} from "react-icons/fa";

import "./navbar.scss";
import { deleteUser } from "../../util/user_api_util";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.getLinks = this.getLinks.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    let currentUsername = this.props.currentUser.username;
    if (currentUsername.slice(0, 4) === "demo") {
      deleteUser(currentUsername);
    }
    this.props.resetRating();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      let username = "";
      if (Object.keys(this.props.user).length === 0) {
        {
          this.props.getUser(this.props.currentUser.username);
        }
      } else {
        username =
          this.props.user.username[0].toUpperCase() +
          this.props.user.username.slice(1);
      }
      return (
        <div className='nav__btn nav__btn-logout'>
          <FaUserCircle className='user-icon' />
          <div className='user-dropdown'>
            <div className='user-rating'>
              <div>{username}</div>
              <div key={this.props.currentUser.elo}>
                <Link to='/leaderboard' style={{ color: "black" }}>
                  <div className='leaderboard-link'>
                    Rating:<span>{this.props.user.elo}</span>
                  </div>
                </Link>
              </div>
            </div>
            <span className='logout-button' onClick={this.handleLogout}>
              <FaBackspace style={{ marginTop: "7px" }} />
              <span className='logout-text'>Logout</span>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className='nav__btn nav__btn-login'
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
      <section className='nav'>
        <div className='nav__logo'>
          CONNECT
          <img
            src='%PUBLIC_URL%/../4.svg'
            width='20'
            height='20'
            style={{ marginBottom: "-1px", marginRight: "0px" }}
          />
          RIENDS
        </div>

        <div className='nav__play'>
          <Link to='/' onClick={this.props.closeModal}>
            <span>Mode</span>
            <FaPlay className='nav__play__btn' />
          </Link>
        </div>
        {this.getLinks()}
      </section>
    );
  }
}
export default NavBar;
