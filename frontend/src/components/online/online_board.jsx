import React from 'react';
import { connect } from "react-redux"

class OnlineBoard extends React.Component {
    constructor(props) {
        super(props)
        
       
        }
    
    render() {
        return(
            <div>this is board</div>
        )
    }
}


const mSTP = (state) => {

    return {
        currentUser: state.session.user,
        user: state.rating
    }
}

const mDTP = (dispatch) => {
    return;
    
}


export default connect(mSTP, mDTP)(OnlineBoard);