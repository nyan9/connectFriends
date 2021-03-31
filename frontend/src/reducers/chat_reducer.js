import {GET_CHAT, AFTER_POST_MESSAGE, RESET_CHAT} from '../actions/chat_actions'

export default function(state = {}, action){
    switch(action.type){
        case GET_CHAT:
            return {...state, chats: action.payload.data}
            // return Object.assign({},state, action.payload.data)
        case AFTER_POST_MESSAGE:
            return {...state, chats: state.chats.concat(action.payload)}
        case RESET_CHAT:
            return {}
        default:
            return state;
    }
}