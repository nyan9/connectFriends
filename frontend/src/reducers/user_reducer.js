import {GET_USERS, UPDATE_ELO, GET_USER} from '../actions/user_actions'

export default function(state = {}, action){
    
    switch(action.type){
        case GET_USERS:
            return Object.assign({}, state, action.payload.data)
        case UPDATE_ELO:
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}