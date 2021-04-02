import React from 'react';
import OnlineBoard from './online_board';
import * as Online from './online_logic';
import { connect } from 'react-redux'
import Chatbox from '../chatbox/chatbox';
import { io } from "socket.io-client";

class OnlineGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            players: [],
            currentPlayer: {},
            currentColor: "",
            gameOver: false
        }


        // this.socket = io.connect("https://connectfriends.herokuapp.com/", {secure: true});
        this.socket = io.connect("http://localhost:5000/", {secure: true});
        this.socket.on("connect", () => this.socket.emit("join game", this.props.currentUser))
        this.socket.on("joined game", msg => console.log(msg))
        this.socket.on("send msg", msg => console.log("msg:", msg))
        this.socket.on("end game", () => {
            alert("Opponent has disconnected")
            this.props.history.push("/")}
            )
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }
    
    render() {
        return ( 
                <OnlineBoard 
                />
            )
    }
}

const mstp = state => ({
    currentUser: state.session.user
});
const mdtp = dispatch => ({})

export default connect(mstp, null)(OnlineGame);