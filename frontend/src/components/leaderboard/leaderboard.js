import React from 'react'
import {connect} from 'react-redux'

const Leaderboard = (props) => {

    return (
        <div>
            <div>Leaderboard</div>

        </div>
    )
}

// const mSTP = state => {
//     return{
//         users: Object.values(state.users)
//     }
// }

export default connect()(Leaderboard)