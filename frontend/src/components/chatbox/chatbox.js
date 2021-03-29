import React from 'react'
import { io } from "socket.io-client";

export default class Chatbox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chatMessage = "",
        }
    }

    componentDidMount(){
        let server = "http://localhost:5000"

        this.socket = io(server)
    } 

    render(){
        return (
            <div>
                <div>
                    <p>Chat with opponent</p>
                </div>
                
                <form>
                    <input type='text' placeholder="Start chatting"/>
                    <button>Send message</button>
                </form>
            </div>
        )
    }
}