import React from 'react';
import Board from './board';
import * as Connect4 from '../connect4/connect4';
import {connect} from 'react-redux'
import Chatbox from './chatbox/chatbox'
import { io } from "socket.io-client";

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: new Connect4.Board(6,7),
            // players: [] 
            // currentPlayer: players[1]
            // instead of currentColor, currentPlayer.color
            currentColor: "red",
            // currentPlayer: [this.props.players.first],
            gameOver: false,
            tie: false,
            type: this.props.location.pathname
        }
        this.updateGame = this.updateGame.bind(this)
        this.socket = io.connect("https://connectfriends.herokuapp.com/", { secure: true });
        // this.socket = io.connect("http://localhost:5000/", { secure: true });
    }

    componentDidMount(){
        //testing socket
        this.socket.emit("current color", this.state.currentColor)
        this.socket.on("test", msg => console.log(msg))
        console.log(this.state.type)
    }

    updateGame() {
        
        
        if (this.state.board.gameOver) {
            this.setState({gameOver: true})
            alert(`Game Over. ${this.state.currentColor} wins!`)
        }
        
        if (this.state.board.full() && !this.state.board.gameOver) {
            this.setState({gameOver: true, tie: true})
            alert("It's a tie!")
        }
        
        this.setState({board: this.state.board})
        if (this.state.currentColor == "red") {
            // setState({currentPlayer})
            this.setState({currentColor: "yellow"})
        } else {
            this.setState({currentColor: "red"})
        }
    }

    render() {
        return(
            <div>
                <h1>this is the game component</h1>
        
                <Board board={this.state.board}
                    updateGame={this.updateGame}
                    currentColor={this.state.currentColor}
                    gameOver={this.state.gameOver}
                    type={this.state.type}
                />

                <Chatbox/>
            </div>
        )
    }
}

const mstp = state => state; 
const mdtp = dispatch => ({})

export default connect(mstp, null)(Game);