import React from 'react';
import OnlineBoard from './online_board';
import * as Online from './online_logic';
import { connect } from 'react-redux'
import Chatbox from '../chatbox/chatbox';
import { io } from "socket.io-client";

class OnlineGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [[null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null]],
            players: [],
            currentPlayer: {},
            currentColor: "red",
            gameOver: false,
            tie: false,
            winColor: ""
        }

        this.winGame = this.winGame.bind(this);
        this.tieGame = this.tieGame.bind(this);

        this.socket = io.connect("https://connectfriends.herokuapp.com/", {secure: true});
        // this.socket = io.connect("http://localhost:5000/", {secure: true});
        this.socket.on("connect", () => this.socket.emit("join game", this.props.currentUser))
        this.socket.on("joined game", msg => console.log(msg))
        this.socket.on("send msg", msg => console.log("msg:", msg))
        this.socket.on("end game", () => {
            alert("Opponent has disconnected")
            this.props.history.push("/")}
            )
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }

    winGame(color) {
        this.setState({gameOver: true, winColor: color})
        this.socket.emit("finish game")
    }

    tieGame(){
        this.setState({gameOver: true, tie: true})
        this.socket.emit("finish game")
    }

    render() {
        let winMsg = "" 
        if (this.state.gameOver && !this.state.tie) {
            winMsg = <div>GAME OVER! {this.state.winColor.toUpperCase()} Wins!!!</div>
        } else if (this.state.gameOver && this.state.tie) {
            winMsg = <div>It's a tie!</div>
        }

        return ( 
                <div>
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
                    />
                    {winMsg}
                </div>
            )
    }
}

const mstp = state => ({
    currentUser: state.session.user
});
const mdtp = dispatch => ({})

export default connect(mstp, null)(OnlineGame);