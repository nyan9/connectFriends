import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

import Game from "../components/game";
import OnlineGame from "../components/online/online";
import Chatbox from "../components/chatbox/chatbox";
import ModePage from "./mode/mode_page";
import Leaderboard from "./leaderboard/leaderboard";
import { Switch, Route } from "react-router-dom";
import Modal from "./modal/modal";
import NavBarContainer from "./nav/navbar_container";

const App = () => (
  <div className="bigDaddyDiv">
    <Modal />
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={ModePage} />
      <Route exact path="/local" component={Game} />
      <ProtectedRoute exact path="/cpu" component={Game} />
      <ProtectedRoute exact path="/online" component={OnlineGame} />
      <div className="leaderboardContainerdiv">
        <Route exact path="/leaderboard" component={Leaderboard} />
      </div>
    </Switch>
  </div>
);

export default App;
