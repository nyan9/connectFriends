import {GET_USER} from '../actions/user_actions'

export default function(state = {}, action){
    switch(action.type){
        case GET_USER:
            return Object.assign({}, state, action.payload.data)
        default:
            return state;
    }
}