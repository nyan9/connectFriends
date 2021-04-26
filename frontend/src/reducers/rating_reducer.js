import {GET_USER, REMOVE_USER} from '../actions/user_actions'

export default function(state = {}, action){
    switch(action.type){
        case GET_USER:
            return Object.assign({}, state, action.payload.data)
        case REMOVE_USER:
            return {}
        default:
            return state;
    }
}