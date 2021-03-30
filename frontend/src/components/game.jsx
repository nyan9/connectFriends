import React from 'react';
import Board from './board';
import * as Connect4 from '../connect4/connect4';
import {connect} from 'react-redux'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: new Connect4.Board(6,7),
            // players: [] 
            // currentPlayer: players[1]
            // instead of currentColor, currentPlayer.color
            currentColor: "red",
            gameOver: false,
            tie: false
        }
        this.updateGame = this.updateGame.bind(this)
    }

    updateGame() {
        this.setState({board: this.state.board})
        if (this.state.currentColor == "red") {
            // setState({currentPlayer})
            this.setState({currentColor: "black"})
        } else {
            this.setState({currentColor: "red"})
        }


        if (this.state.board.gameOver) {
            this.setState({gameOver: true})
            alert(`Game Over. ${this.state.currentColor} wins!`)
        }

        if (this.state.board.full() && !this.state.board.gameOver) {
            this.setState({gameOver: true, tie: true})
            alert("It's a tie!")
        }
    }

    render() {
        return(
            <div>
                <h1>this is the game component</h1>
                <Board board={this.state.board} updateGame={this.updateGame} currentColor={this.state.currentColor} />
            </div>
        )
    }
}

