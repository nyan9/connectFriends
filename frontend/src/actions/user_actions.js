import {getUsers} from '../util/user_api_util'

export const GET_USERS = 'GET_USERS'

export function receiveUsers(payload){
    return {
        type: GET_USERS,
        payload: payload
    }
}

export const getUser = () => (dispatch) => {
    return getUsers().then((users) => dispatch(receiveUsers(users)))
}