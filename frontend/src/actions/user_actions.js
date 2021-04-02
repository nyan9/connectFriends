import {getUsers, updateUser, getCurrentUser} from '../util/user_api_util'

export const GET_USERS = 'GET_USERS'
export const UPDATE_ELO = 'UPDATE_ELO'
export const GET_USER = 'GET_USER'


export function receiveUser(payload){
    return {
        type: GET_USER,
        payload
    }
}
 
export function receiveUsers(payload){
    return {
        type: GET_USERS,
        payload: payload
    }
}


export function updateElo(payload){
    return {
        type: UPDATE_ELO,
        payload
    }
}

export const getCurrUser = (username) => (dispatch) => {
    return getCurrentUser(username).then((user)=> dispatch(receiveUser(user)))
}

export const getUser = () => (dispatch) => {
    return getUsers().then((users) => dispatch(receiveUsers(users)))
}

export const updateRating = (username, rating) => (dispatch) => {
    
    return updateUser(username, rating).then(((user) => dispatch(updateElo(user))), (err => console.log(err)))
}
