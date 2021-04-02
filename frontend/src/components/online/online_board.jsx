import React from 'react';
import { connect } from "react-redux"
import * as Online from "./online_logic";

export default class OnlineBoard extends React.Component {
    constructor(props) {
        super(props)
        // board = { this.state.board } // this is actually just a 2d array instance
        // players = { this.state.players }
        // currentPlayer = { this.state.currentPlayer }
        // currentColor = { this.state.currentColor }
        // gameOver = { this.state.gameOver }
        // currentUser = { this.props.currentUser }
        // socket = { this.socket }
       this.board = new Online.Board(this.props.board)

       // bound callbacks
       this.toggleHover = this.toggleHover.bind(this)
       this.placePiece = this.placePiece.bind(this)
       this.updateBoard = this.updateBoard.bind(this)
    
    //    this.props.socket.on("update board", lastPos_and_color => this.updateBoard(lastPos_and_color))
    }

    componentDidMount() {
        this.props.socket.on("update board", lastPos_and_color => this.updateBoard(lastPos_and_color)) //testing
    }

    toggleHover(){

    }

    placePiece(e){
        e.preventDefault();
        this.props.socket.emit("play turn", this.props.currentUser)
        let lastPos = null;
        this.props.socket.on("allow turn", () => {
            lastPos = this.board.lastPiecePos(parseInt(e.target.className))
            // fills last position of column with a piece object
        })
        // the following code needs to be asynchronous bc the above code is as well
        setTimeout(() => {
            if (lastPos) this.props.socket.emit("send pos", lastPos)
        }, 0)
    }

    updateBoard(lastPos_and_color){
        let pos = lastPos_and_color[0]
        let color = lastPos_and_color[1]
        debugger
        this.board.fillPos(pos[0], pos[1], color)
        document.getElementById(`${pos[0]},${pos[1]}`).style.backgroundColor = color;

        // fills position with the gameState's currentColor
    }

    


    render() {
        const grid = this.board.grid.map((row, y) => {
            const elements = row.map((ele, x) => {
                return (
                    <div key={x} 
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.toggleHover}
                        onClick={this.placePiece}
                        className={`${x} col`}
                        id={`${y},${x}`}>
                        &nbsp;
                    </div>
                )
            })
            return (
                <div key={y} className={`row ${y}`}>
                    {elements}
                </div>
            )
        })
        

        return(
            <div className="board-container">
                <div className="board">
                    {grid}
                </div>
            </div>
        )
    }
}


