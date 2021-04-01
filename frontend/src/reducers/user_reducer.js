import {GET_USERS} from '../actions/user_actions'

export default function(state = {}, action){
    switch(action.type){
        case GET_USERS:
            return Object.assign({}, state, action.payload.data)
        default:
            return state;
    }
}