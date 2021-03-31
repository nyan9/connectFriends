import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import Game from "../components/game";
import Chatbox from "../components/chatbox/chatbox";
import ModePage from "./mode/mode_page";
import NavBarContainer from "./nav/navbar_container";
// import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={ModePage} />
      <ProtectedRoute exact path="/play" component={Game} />
    </Switch>
  </div>
);

export default App;
