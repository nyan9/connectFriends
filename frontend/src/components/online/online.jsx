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
            winner: ""
        }

        // this.getServerState = this.getServerState.bind(this) // too laggy
        this.winGame = this.winGame.bind(this);


        // this.socket = io.connect("https://connectfriends.herokuapp.com/", {secure: true});
        this.socket = io.connect("http://localhost:5000/", {secure: true});
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

    // getServerState() {
    //     this.socket.emit("get game")
    //     // this.socket.on("send game", gameState => this.setState(gameState))
    //     this.socket.on("send game", gameState => console.log("gameState:", gameState))
    // }
    // // this works but it's very very laggy


    winGame() {
        this.setState({gameOver: true})
        this.socket.emit("win game")
    }

    render() {
        // this.getServerState() // too laggy
        let winMsg = "" 
        if (this.state.gameOver) {
            winMsg = <div>GAME OVER</div>
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