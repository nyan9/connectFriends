import React from 'react';
import Piece from './piece';
import * as Connect4 from '../connect4/connect4';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const grid = this.props.board.grid.map((row, idx) => {
            const elements = row.map((ele, idx2) => {
                return <span>&nbsp;X&nbsp;</span>
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
                {grid}
                <Piece /> 
            </div>
        )
    }
}