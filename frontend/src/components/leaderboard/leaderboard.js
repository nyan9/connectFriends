import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../actions/user_actions'

class Leaderboard extends React.Component {

    componentDidMount(){
        this.props.getUsers()
    }
    render(){
        debugger
        let leaderboard = ""; 
        let n = 0
       if (this.props.users){
        leaderboard=<div>{this.props.users.map((user,idx) => {
                    {n += 1}
                    return <div>{n}. {user.username}</div>
                })}
            </div>
       }

        return (
            <div>
                {leaderboard}
            </div>
        )
    }
}

const mSTP = state => {
    debugger
    return{
        users: Object.values(state.users)
    }
}

const mDTP = dispatch => {
    return {
        getUsers: () => dispatch(getUser())
    }
}


export default connect(mSTP, mDTP)(Leaderboard)