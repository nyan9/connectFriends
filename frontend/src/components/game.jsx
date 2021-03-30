import React from 'react';
import Board from './board';
import * as Connect4 from '../connect4/connect4';

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: new Connect4.Board(6,7),
            currentColor: "red",
            gameOver: false,
            tie: false
        }
        this.updateGame = this.updateGame.bind(this)
    }

    updateGame() {
        this.setState({board: this.state.board})
        if (this.state.currentColor == "red") {
            this.setState({currentColor: "black"})
        } else {
            this.setState({currentColor: "red"})
        }

        if (this.state.board.win()) {
            this.setState({gameOver: true})
            alert("Game Over!")
        } 

        if (this.state.board.full() && !this.state.board.win()) {
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