
import React from 'react'
import { io } from "socket.io-client";
import {connect} from "react-redux";
import {moment} from "moment";

class Chatbox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chatMessage: "",
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        let server = "http://localhost:5000"

        this.socket = io(server)
    } 

    handleInput(e) {
        this.setState({
            chatMessage: e.target.value
        })
    } 
    handleSubmit(e){
        e.preventDefault();

        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData.id 
        let userName = this.props.user.userData.username
        let nowTime = moment();
        
        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            nowTime
        });
        this.setState({ chatMessage: ''})
    }
    render(){
        return (
            <div>
                <div>
                    <p>Chat with opponent</p>
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder="Start chatting" value={this.state.chatMessage} onChange={this.handleInput}/>
                    <button>Send message</button>
                </form>
            </div>
        )
    }
}
// const express = require("express")
// const app = express();
// const server = require("http").createServer(app)
// const io = require("socket.io")(server)



const mSTP = (state) => ({
    
        user: state.user
    
})

export default connect(mSTP)(Chatbox)



