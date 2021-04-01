import React from 'react';
import Piece from './piece';
import * as computer from '../connect4/minimax';
import {connect} from "react-redux"
import {updateRating, getCurrUser} from "../actions/user_actions"

class Board extends React.Component {
    constructor(props) {
        super(props)
        // this.props.board is Connect4.Board instance 
        // this.props.updateGame is triggers board to re-render
        // this.props.currentColor is red

        this.state = {
            win: 0,
            loss: 0,
            tie: 0,
            gameOver: false,
        }

        this.placePiece = this.placePiece.bind(this)
        this.hoverColumn = this.hoverColumn.bind(this)
        this.unHoverColumn = this.unHoverColumn.bind(this)
    }

    componentDidMount(){
        if(this.props.currentUser && !this.props.user){
            this.props.getUser(this.props.currentUser.username)
        }
    }

    placePiece(x, y) {
        if (this.props.gameOver) return;
        
        return e => {
            e.preventDefault();
            for (let i = x; i < 6; i++) {
                if (this.props.board.emptyAt(i, y) && (!this.props.board.emptyAt(i + 1, y) || (i == 5) )) {
                    // define Connect4.Board.fillPos: fillpos, switch turns 

                    
                    // this.props.board.fillPos(i, y, "red")
                    this.props.board.fillPos(i, y, this.props.currentColor)
                    // this.props.currentPlayer.color instead
                    if (this.props.gameOver){
                        this.setState({gameOver:true})
                    } 
                    if (this.props.tie) {
                        this.setState({gameOver:true})
                    }
                    
                    if (this.props.board.win(i,y)){
                        this.props.handlewin()
                        this.setState({gameOver:true})
                        if(this.props.user){
                            this.props.updateRating(this.props.user.username, (this.props.user.elo + 10))
                        }
                    }
                    // document.getElementById(`${i},${y}`).style.backgroundColor = "red"

                    this.props.board.fillPos(i, y, this.props.currentColor)
                    // this.props.currentPlayer.color instead
                    this.props.board.win(i,y)

                    document.getElementById(`${i},${y}`).style.backgroundColor = this.props.currentColor
                    this.props.updateGame();
                    
                    
                    if (this.props.type === "/cpu") {
                        setTimeout(()=>{
                            let aiPos = computer.bestMove(this.props.board, this.props.currentColor);

                            
                            // this.props.board.fillPos(aiPos[0],aiPos[1], "black");
                            this.props.board.fillPos(aiPos[0],aiPos[1], this.props.currentColor);
                            
                            
                            if (this.props.board.win(aiPos[0],aiPos[1])){
                                this.props.handleloss()
                                this.setState({gameOver:true})
                                
                                if(this.props.user){
                                    
                                    this.props.updateRating(this.props.user.username, (this.props.user.elo - 10))
                                    this.props.getUser(this.props.currentUser.username)
                                }
                            }

                            // document.getElementById(`${aiPos[0]},${aiPos[1]}`).style.backgroundColor = "black";

                            this.props.board.fillPos(aiPos[0],aiPos[1], this.props.currentColor);
                            this.props.board.win(aiPos[0],aiPos[1]);

                            document.getElementById(`${aiPos[0]},${aiPos[1]}`).style.backgroundColor = this.props.currentColor;
                            this.props.updateGame();
                        }, 0)
                    }
                }
            }
        }
    }

    hoverColumn(x,y){
        let color = ""
        if (this.props.currentColor === "red") {
            color = "#fe6599"
        } else {
            color = "#ffff99"
        }


        if (this.props.gameOver) return;
        return e => {
            for (let i = 0; i < 6; i++) {
                if (this.props.board.emptyAt(i, y)) {
                    if (!this.props.board.emptyAt(i + 1, y) || (i == 5)) {
                        document.getElementById(`${i},${y}`).style.backgroundColor = color
                    } else {
                        document.getElementById(`${i},${y}`).style.backgroundColor = "#ffffff8c"

                    }
                }
            }
        }
    }


    unHoverColumn(x,y){
        if (this.props.gameOver) return;
        return e => {
            for (let i = 0; i < 6; i++) {
                if (this.props.board.emptyAt(i, y)) {
                    document.getElementById(`${i},${y}`).style.backgroundColor = "white"
                    document.getElementById(`${i},${y}`).style.opacity = 1
                }
                // if (this.props.board.emptyAt(i, y) && (!this.props.board.emptyAt(i + 1, y) || (i == 5))) {
                //     document.getElementById(`${i},${y}`).style.backgroundColor = "white"
                // }
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

const mSTP = (state) => {
    
    return {
        currentUser:state.session.user,
        user: state.rating
    }
}

const mDTP = (dispatch) => {
    return {
        updateRating: (username, rating) => dispatch(updateRating(username, rating)),
        getUser: (username) => dispatch(getCurrUser(username))
    }
}


export default connect(mSTP, mDTP)(Board)