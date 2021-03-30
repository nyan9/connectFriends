import React from "react";
import Game from '../game';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Connect Friends!</h1>
        <Game />
      </div>
    );
  }
}

export default MainPage;
