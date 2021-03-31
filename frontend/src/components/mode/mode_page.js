import React from "react";
import { Link } from "react-router-dom";

class ModePage extends React.Component {
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
export default ModePage;
