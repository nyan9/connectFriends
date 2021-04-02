import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "../modal/modal";
import { FaPlay, FaGlobeAmericas, FaBackspace } from "react-icons/fa";
import "./navbar.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    e.preventDefault();
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="nav__btn nav__btn-logout" onClick={this.logoutUser}>
          <FaBackspace />
          <span>Logout</span>
        </div>
      );
    } else {
      return (
        <>
          <Modal
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
          />
          <div className="nav__btn nav__btn-login" onClick={this.toggleModal}>
            <FaGlobeAmericas />
            <span>Login</span>
          </div>
        </>
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
