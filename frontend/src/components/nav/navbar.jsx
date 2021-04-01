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
    if(this.props.currentUser){
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
      return (
        <div>
          <button onClick={this.logoutUser}>Logout</button>
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
    let rating = ""
    if (this.props.user){
      rating = <div>
                <div>{this.props.user.elo}</div>
                <div>{this.props.user.username}</div>
              </div>
    }
    return (
      <>
        {this.getLinks()}
        <div>LOGO HERE</div>
        <Link to={"/"}>Play Mode</Link>
        {rating}
      </>
    );
  }
}
export default NavBar;


