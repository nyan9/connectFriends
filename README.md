<!-- markdownlint-disable-file MD033 -->

<h1 align="center"> Connect4riends </h1> <br>
<p align="center">
    <a href="https://connect4riends.herokuapp.com/">
        <img alt="Connect 4riends" title="Connect4riends" src="app/assets/images/logo.svg" width="200">
    </a>
</p>

<p align="center" > Play against friends locally, online, or challenge the AI </p>
<p align="center" > <a href="https://connect4riends.herokuapp.com/"> :red_circle: :yellow_circle: LINK TO LIVE SITE :red_circle: :yellow_circle: </a></p>

## Table of Contents

1. [Overview](#overview)
    - [Technologies](#technologies)
    - [Libraries & Methodologies](#libraries--methodologies)
2. [Features](#features)
3. [Technical Implementation Details](#technical-implementation-details)
    - [Persist User Login](#persist-user-login)
    - [Socket.IO](#socketio)
    - [Minmax Algorithm for the AI Player](#minmax-algorithm-for-the-ai-player)
4. [TODOs / Features to implement](#todos--features-to-implement)
5. [Authors Info](#authors-info)


## Overview

Connect4riends is a full stack online implementation of the Connect Four game. Four talented engineers [(check authors' info :arrow_down_small:)](#authors-info) collaborated to build the components of the game, real time chat, and a live game room. <br> 
Compete against players online to improve your ranking and move up on the global leaderboard.

### Technologies

- Socket.IO
- React
- Redux
- Node.js
- Express.js
- MongoDB

### Libraries & Methodologies

- [Axios-HTTP](https://github.com/axios/axios) for sending and requesting data asynchronously.
- [Mongoose](https://github.com/Automattic/mongoose) for schema-based solution to model data.
- [JWT Web Token](https://github.com/auth0/node-jsonwebtoken) for secure sign in and access protected routes.
- [Passport JWT](https://github.com/mikenicholson/passport-jwt) for authenticating token and constructing private routes.
- [BCrypt](https://github.com/dcodeIO/bcrypt.js) for storing salted and encrypted password hash.
- [Validator.js](https://github.com/validatorjs/validator.js) for seamless user data validation.

## Features

- *USER AUTH*
  - Login, Create Account
  - or play as guest / demo-user

- *GAME MODES*
  - Local multiplayer 
  - Online multiplayer
  - AI single-player

- *LEADERBOARD*
  - Global player rankings


[Back To The Top :arrow_up_small:](#table-of-contents)

## Technical Implementation Details

### Persist User Login

To allow users to stay logged in after closing the browser, the JWT token is saved on `localStorage` as `"jwtToken"`. <br>
`setAuthToken()` function is used to set the header to pass along the JWT token to the backend for future AXIOS login requests. 
Any request after we make the token will now automatically have the `"Authorization"` header with the token and it won't have to be declared every time.

```javascript
// src/util/session_api_util.js
import axios from "axios";

export const setAuthToken = (token) => {
  // if there's a token, set that token as default authorization header
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// src/actions/session_actions.js
import jwt_decode from "jwt-decode"
import * as APIUtil from "../util/session_api_util";

export const login = (user) => (dispatch) =>
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
        // decoded token includes username, email, and id
      const decoded = jwt_decode(token);
        // sets currentUser as the decoded jwt token
      dispatch(receiveCurrentUser(decoded));
        // close the login/signup modal after the user is logged in
      dispatch(closeModal());
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
```

### Socket.IO

```javascript
    //Socket.IO explaination will go here
```

### Minmax Algorithm for the AI Player

```javascript
    //Minmax Algorithm explaination will go here
```

[Back To The Top :arrow_up_small:](#table-of-contents)


## TODOs / Features to implement

- [ ] Button to open an incognito instance of browser window to be able to test multiplayer mode without logging in

[Back To The Top :arrow_up_small:](#table-of-contents)

---

## Authors Info

-  [Ryan Naing](www.ryannaing.com)
-  [John Cheung]()
-  [Kenny Li]()
-  [Andrew Kim]()


[Back To The Top :arrow_up_small:](#table-of-contents)
