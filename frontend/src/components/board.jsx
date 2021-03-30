import React from 'react';
import Piece from './piece';
import * as Connect4 from '../connect4/connect4';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        // this.props.board is Connect4.Board instance 
    }

    render() {
        const grid = this.props.board.grid.map((row, idx) => {
            const elements = row.map((ele, idx2) => {
                return <div class="col empty">&nbsp;</div>
            })
            
            return (
                <div className="row">
                    {elements}
                </div>
            )
        })


        return(
            <div>
                <h2>this is the board component</h2>
                <div className="board">
                    {grid}
                </div>
                <Piece /> 
            </div>
        )
    }
}