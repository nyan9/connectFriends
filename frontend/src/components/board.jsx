import React from 'react';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        // this.props.board is Connect4.Board instance 
        // this.props.updateGame is triggers board to re-render
        // this.props.currentColor is red
        this.placePiece = this.placePiece.bind(this)
        this.hoverColumn = this.hoverColumn.bind(this)
        this.unHoverColumn = this.unHoverColumn.bind(this)
    }

    placePiece(x, y) {
        if (this.props.gameOver) return;
        return e => {
            e.preventDefault();
            for (let i = x; i < 6; i++) {
                // define Connect4.Board.emptyAt
                if (this.props.board.emptyAt(i, y) && (!this.props.board.emptyAt(i + 1, y) || (i == 5) )) {
                    // define Connect4.Board.fillPos: fillpos, switch turns 
                    this.props.board.fillPos(i, y, this.props.currentColor)
                    // this.props.currentPlayer.color instead
                    this.props.board.win(i,y)
                    document.getElementById(`${i},${y}`).style.backgroundColor = this.props.currentColor
                    this.props.updateGame();
                }
            }
        }
    }

    hoverColumn(x,y){
        if (this.props.gameOver) return;
        return e => {
            for (let i = x; i < 6; i++) {
                if (this.props.board.emptyAt(i, y) && (!this.props.board.emptyAt(i + 1, y) || (i == 5))) {
                    document.getElementById(`${i},${y}`).style.backgroundColor = "orange"
                }
            }
        }
    }

    unHoverColumn(x,y){
        if (this.props.gameOver) return;
        return e => {
            for (let i = x; i < 6; i++) {
                if (this.props.board.emptyAt(i, y) && (!this.props.board.emptyAt(i + 1, y) || (i == 5))) {
                    document.getElementById(`${i},${y}`).style.backgroundColor = "white"
                }
            }
        }
    }



    render() {
        const grid = this.props.board.grid.map((row, idx) => {
            const elements = row.map((ele, idx2) => {
                return (
                    <div key={idx2} onMouseLeave={this.unHoverColumn(idx,idx2)} 
                    onMouseEnter={this.hoverColumn(idx,idx2)} onClick={this.placePiece(idx, idx2)} 
                    className="col empty" id={`${idx},${idx2}`}>&nbsp;</div>
                )
            })
            
            return (
                <div key={idx} className="row">
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
            </div>
        )
    }
}