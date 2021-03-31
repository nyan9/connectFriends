import axios from 'axios'
import {CHAT_SERVER} from '../components/Config.js'
import {getChats, resetChats} from '../util/chat_api_util'

export const GET_CHAT = 'GET_CHAT'
export const AFTER_POST_MESSAGE = 'AFTER_POST_MESSAGE'
export const RESET_CHAT = 'RESET_CHAT'

export function receiveChats(payload){
    return {
        type: GET_CHAT,
        payload
    }
}

export const getChat = () => (dispatch) => {
    return getChats().then((chats) => dispatch(receiveChats(chats)))
}

export function deleteChats(){
    return {
        type: RESET_CHAT
    }
}

export const resetChat = () => dispatch => {
    return resetChats().then(() => dispatch(deleteChats()))
}

export function afterPostMessage(data){
    return{
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}