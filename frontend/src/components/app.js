import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import {Route} from "react-router-dom";
import Game from '../components/game';
import Chatbox from '../components/chatbox/chatbox'

import NavBarContainer from "./nav/navbar_container";
// import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
       <Route path="/play" component={Game} />
       <Route path="/chat" component={Chatbox} />
    </Switch>
  </div>
);

export default App;
