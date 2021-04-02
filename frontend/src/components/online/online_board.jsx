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
       this.board = new Online.Board(this.props.board)
    }

    // playTurn() {
    //     // playTurn only if you are the current player
    //     if (this.props.currentPlayer.id == this.props.currentUser.id) {
            
    //     }
    // }


    render() {
        return(
            <div>this is board</div>
        )
    }
}


