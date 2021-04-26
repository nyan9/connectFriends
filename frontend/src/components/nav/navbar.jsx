import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaGlobeAmericas, FaBackspace, FaCrown} from "react-icons/fa";
import "./navbar.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.getLinks = this.getLinks.bind(this);
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {  
    if (this.props.loggedIn) {
      debugger
      console.log(this.props.user)
      let username=""
      if (Object.keys(this.props.user).length === 0) {
        {
          debugger
          this.props.getUser(this.props.currentUser.username);
        }
      }else{
        
        username = this.props.user.username[0].toUpperCase() + this.props.user.username.slice(1);
      }
      return (
        <div className="nav__btn nav__btn-logout" onClick={this.props.logout}>
          <div className="user-rating">
            <div>User:{username}</div>
            <div key={this.props.user.elo}>Rating:{this.props.user.elo}</div>
          </div>
          <span style={{marginTop: "5px", marginLeft:"-25px"}}>
            <FaBackspace />
            <span>Logout</span>
          </span>
          {/* <button onClick={this.props.logout}>LOGOUT</button> */}
        </div>
      );
    } else {
      return (
        <div
          className="nav__btn nav__btn-login"
          onClick={() => this.props.openModal("login")}
        >
          <div style={{display: "flex", gap: "5px"}}>
          <FaGlobeAmericas />
          <span>Login</span>
          </div>
        </div>
      );
    }
  }

  render() {
    let navClass = "nav"

    if (this.props.loggedIn){
      navClass = "nav-2"
    }
    return (
      <section className={navClass}>
        <div className="nav__logo">CONNECT<img src="%PUBLIC_URL%/../4.svg" width="20" height="20" style={{marginBottom:"-1px", marginRight:"0px"}}/>RIENDS</div>
        
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
