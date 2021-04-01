import React from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {resetChat} from "../../actions/chat_actions"

class ModePage extends React.Component {

  componentDidMount(){
    this.props.resetChat()
  }
  render() {
    return (
      <>
        <div>
          <Link to="/cpu"> Single Player(AI) </Link>
        </div>
        <br />
        <div>
          <Link to="/local"> Local 2 Player (Local)</Link>
        </div>
        <br />
        <div>
          <Link to="/online">Online Multiplayer</Link>
        </div>
      </>
    );
  }
}



const mDTP = dispatch => {
  return {
    resetChat: () => dispatch(resetChat())
  }
}

export default connect(null, mDTP)(ModePage)