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
          <Link to="/play"> Single Player(AI) </Link>
        </div>
        <br />
        <div>Single Player(2P)</div>
        <br />
        <div>Online Multiplayer</div>
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