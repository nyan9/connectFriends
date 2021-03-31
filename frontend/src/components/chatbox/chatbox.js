
import React from 'react'
import { io } from "socket.io-client";
import {connect} from "react-redux";
import moment from "moment";
import {getChat, afterPostMessage, resetChat} from "../../actions/chat_actions"
import ChatCard from "./chatcard"


class Chatbox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chatMessage: " ",
        }
        this.handleInput = this.handleInput.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
       
        let server = "http://localhost:5000";

        this.props.getChats()

        this.socket = io.connect("https://connectfriends.herokuapp.com/", {secure:true});

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            debugger
            if (this.state.chatMessage === ''){
                this.setState({ chatMessage: ' '})
                this.props.afterPostMessage(messageFromBackEnd)}
                this.props.getChats()
                
            }

            )
    } 
    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({behavior: 'smooth'})
    }
    handleInput(e) {
        this.setState({
            chatMessage: e.target.value
        })
    } 
    handleSubmit = (e) =>{
        debugger
        e.preventDefault();
        let chatMessage = this.state.chatMessage
        let userId = this.props.user.id 
        let userName = this.props.user.username 
        let nowTime = moment();
        let type = "Text"
        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            nowTime,
            type
        });
        this.setState({ chatMessage:''})
    }

    renderCards = () => (
        
        this.props.chats && 
        this.props.chats.map((chat, i)=>(
           <ChatCard key={i} {...chat} sender={chat.sender} message={chat.message}/>
         
      )))
    
    render(){
        
        return (
            <div className="outer-chatbox">
                <div>
                    <p style={{borderBottom: '1px solid black', marginBottom: '1px', paddingBottom: '10px'}}>Chat with opponent</p>
                </div>
                <div>
                    
                        <div style={{height: '485px', overflowY:'scroll'}}>
                           
                           {this.renderCards()}
                            <div
                                ref={el=>{
                                    this.messagesEnd = el
                                }}
                                style={{float: "left", clear:"both"}}
                            />
                        </div>
                 
                </div>
                
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type='text' placeholder="Start chatting" value={this.state.chatMessage} onChange={this.handleInput} style={{width: '88%'}}/>
                    <button>Send</button>
                </form>
            </div>
        )
    }
}


const mSTP = (state) => {
    
    return{
        user: state.session.user, 
        chats: (state.chat.chats && state.chat.chats != {}) ? Object.values(state.chat.chats) : ""
    }
}
const mDTP = (dispatch) => {
    return {
        getChats: () => dispatch(getChat()),
        afterPostMessage: (data) => dispatch(afterPostMessage(data)),
        
    }
}

export default connect(mSTP, mDTP)(Chatbox)



