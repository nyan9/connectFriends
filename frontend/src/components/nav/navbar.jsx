import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "../modal/modal";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  background: #141414;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
`;

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
  componentDidMount(){

    if(this.props.loggedIn){
            this.props.getUser(this.props.currentUser.username)
      }
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

      if (!this.props.user){
        {this.props.getUser(this.props.currentUser.username)}
      }

      return (
        <div>
          <button onClick={this.logoutUser}>Logout</button>
          <div key={this.props.user.elo}>{this.props.user.elo}</div>
          <div>{this.props.user.username}</div>
        </div>
      );
    } else {
      return (
        <>
          <Modal
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
          />
          <Container>
            <Button onClick={this.toggleModal}>Login</Button>
          </Container>
        </>
      );
    }
  }

  render() {
    return (
      <>
        {this.getLinks()}
        <div>LOGO HERE</div>
        <Link to={"/"}>Play Mode</Link>
        
      </>
    );
  }
}
export default NavBar;


