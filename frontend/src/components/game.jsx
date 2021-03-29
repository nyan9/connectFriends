import React from 'react';
import Board from './board';
import * as Connect4 from '../connect4/connect4';

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bSize: 10,
            board: new Connect4.Board(10)
        }
    }

    render() {
        return(
            <div>
                <h1>this is the game component</h1>
                <Board board={this.state.board}/>
            </div>
        )
    }
}