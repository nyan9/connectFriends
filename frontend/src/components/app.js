import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

import Game from "../components/game";
import ModePage from "./mode/mode_page";
import Leaderboard from "./leaderboard/leaderboard";
import { Switch, Route } from "react-router-dom";
import Modal from "./modal/modal";
import NavBarContainer from "./nav/navbar_container";

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={ModePage} />
      <Route exact path="/cpu" component={Game} />
      <Route exact path="/local" component={Game} />
      <ProtectedRoute exact path="/online" component={Game} />
      <ProtectedRoute exact path="/leaderboard" component={Leaderboard} />
    </Switch>
  </div>
);

export default App;
