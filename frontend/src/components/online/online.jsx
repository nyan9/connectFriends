import React from "react";
import OnlineBoard from "./online_board";
// import * as Online from "./online_logic";
import { connect } from "react-redux";
import Chatbox from "../chatbox/chatbox";
import { io } from "socket.io-client";
import { updateRating, getCurrUser } from "../../actions/user_actions";
import { Button } from "antd";
import "./online.scss";

class OnlineGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
      players: [],
      currentPlayer: {},
      currentColor: "red",
      gameOver: false,
      tie: false,
      winColor: "",
    };

    this.winGame = this.winGame.bind(this);
    this.tieGame = this.tieGame.bind(this);

    // this.socket = io.connect("https://connect4riends.herokuapp.com/", {secure: true});
    this.socket = io.connect("http://localhost:5000/", { secure: true });

    this.socket.on("connect", () =>
      this.socket.emit("join game", this.props.currentUser)
    );
    this.socket.on("joined game", (currentPlayer, players) =>
      this.setState({ currentPlayer, players })
    );
    this.socket.on("send msg", (msg) => console.log("msg:", msg));
    this.socket.on("end game", () => {
      this.props.history.push("/");
      alert("Opponent has disconnected");
    });
  }

  componentDidMount() {
    this.socket.on("update player", (currentPlayer) => {
      console.log("updateplayer was called");
      this.setState({ currentPlayer: currentPlayer });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  winGame(color) {
    this.setState({ gameOver: true, winColor: color });
    this.socket.emit("finish game");
    if (this.state.currentPlayer.username === this.props.user.username) {
      this.props.updateRating(
        this.props.user.username,
        this.props.user.elo - 10
      );
    } else {
      this.props.updateRating(
        this.props.user.username,
        this.props.user.elo + 10
      );
    }
    setTimeout(() => {
      this.props.getUser(this.props.currentUser.username);
    }, 100);
  }

  tieGame() {
    this.setState({ gameOver: true, tie: true });
    this.socket.emit("finish game");
  }

  render() {
    let winMsg = "";
    let username = "";
    if (this.state.gameOver && !this.state.tie) {
      // this.props.updateRating(this.props.user.username, (this.props.user.elo + 10))
      username =
        this.state.currentPlayer.username[0].toUpperCase() +
        this.state.currentPlayer.username.slice(1);

      winMsg = (
        // <div className="winMsg">GAME OVER! {this.state.currentPlayer.username} Wins!!!</div>
        <div className="winMsg">GAME OVER! {username} Wins!!!</div>
      );
    } else if (this.state.gameOver && this.state.tie) {
      winMsg = <div>It's a tie!</div>;
    }

    let currUser = this.state.currentPlayer;
    let currUsername = "";
    if (currUser.username) {
      currUsername =
        this.state.currentPlayer.username[0].toUpperCase() +
        this.state.currentPlayer.username.slice(1);
    }

    return (
      <div className="gameDivContainer">
        <div className="currentPlayer">
          The current player is {currUsername}
        </div>
        <OnlineBoard
          board={this.state.board}
          players={this.state.players}
          currentPlayer={this.state.currentPlayer}
          currentColor={this.state.currentColor}
          gameOver={this.state.gameOver}
          currentUser={this.props.currentUser}
          socket={this.socket}
          winGame={this.winGame}
          tieGame={this.tieGame}
          user={this.props.user}
          updateRating={this.props.updateRating}
        />
        <Chatbox />
        {winMsg}
        {this.state.gameOver ? (
          <button className="rematch">Rematch</button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mstp = (state) => ({
  currentUser: state.session.user,
  user: state.rating,
});
const mdtp = (dispatch) => ({
  updateRating: (username, rating) => dispatch(updateRating(username, rating)),
  getUser: (username) => dispatch(getCurrUser(username)),
});

export default connect(mstp, mdtp)(OnlineGame);
