import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import {Route} from "react-router-dom";

import Chatbox from '../components/chatbox/chatbox'

import Game from "./game";
import NavBarContainer from "./nav/navbar_container";
import ModePage from "./mode/mode_page";



const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
       <Route path="/play" component={Game} />
       <Route path="/chat" component={Chatbox} />
      <ProtectedRoute exact path="/play" component={Game} />
      <AuthRoute exact path="/" component={ModePage} />
      <AuthRoute exact path="/play" component={Game} />
    </Switch>
  </div>
);

export default App;
