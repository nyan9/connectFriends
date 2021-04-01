import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../actions/user_actions'

class Leaderboard extends React.Component {

    componentDidMount(){
        this.props.getUsers()
    }
    render(){
        
        let leaderboard = ""; 
        let n = 0
       if (this.props.users){
        leaderboard=
        <div>{this.props.users.map((user,idx) => {
                    {n += 1}
                    return <div style={{display:'flex', justifyContent:'space-between', marginTop: '5px'}}>
                                <div>{n}.</div> 
                                <div>{user.username}</div>
                                <div>{user.elo}</div>
                            </div>
                })}
            </div>
       }

        return (
            <div className='outer-leaderboard'>
                <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold'}}>
                    <div>Ranking</div>
                    <div>Username</div>
                    <div>Rating</div>
                </div>
                <div style={{marginTop: '10px'}}>
                    {leaderboard}
                </div>
                
            </div>
        )
    }
}

const mSTP = state => {
    
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