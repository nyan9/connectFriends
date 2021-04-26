// import {createRequire} from "module"
// const require = createRequire(import.meta.url);
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const passport = require("passport");
const users = require("./routes/api/users");
const chat = require("./routes/api/chat");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    // origin: "http://connect4riends.herokuapp.com",
    methods: ["GET", "POST"],
  },
});
const { Chat } = require("./models/Chat");
const Online = require("./online_logic");

const connect = mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this was inside socket.io
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/chat", chat);
//

let gameState = {
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  // board: [],
  players: [],
  currentPlayer: {},
  currentColor: "red",
  gameOver: false,
};
// try saving gameState as JSON

let game = new Online.Board(gameState.board); // try ln: 78 if not this

io.on("connection", (socket) => {
  let defaultState = {
    board: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    // board: [],
    players: [],
    currentPlayer: {},
    currentColor: "red",
    gameOver: false,
  };

  // let game = new Online.Board(gameState.board); // try ln: 61 if not this

  // chatbox sockets
  socket.on("Input Chat Message", (msg) => {
    connect.then((db) => {
      try {
        let chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          type: msg.type,
        });
        chat.save((err, doc) => {
          if (err) return res.json({ success: false, err });
          Chat.find({ _id: doc._id })
            .populate("sender")
            .exec((err, doc) => {
              return io.emit("Output Chat Message", doc);
            });
        });
      } catch (error) {
        console.error(error);
      }
    });
  });

  // testing socket in game component

  // add players to game
  socket.on("join game", (player) => {
    io.emit("send msg", `${player.username} requested join game`)
    io.emit("send msg", `${gameState.players.length} current players before push`)
    if (gameState.players.length < 2) {
      if (gameState.players.length == 0) {
        gameState.currentPlayer = player;
      }
      gameState.players.push(player);
      io.emit("joined game", gameState.currentPlayer, gameState.players);
      io.emit("send msg", `${player.username} successfully joined game`);
      io.emit("send msg", `${gameState.players.length} current players`);
    }
  });

  socket.on("disconnect", () => {
    gameState = Object.assign({}, defaultState);
    game = new Online.Board(defaultState.board);
    socket.broadcast.emit("end game");
  });

  // socket.on("get game", () => io.emit("send game", gameState))
  // // very laggy

  socket.on("play turn", (currentUser) => {
    // add 
    if (currentUser.id === gameState.currentPlayer.id && !gameState.gameOver) {
      socket.emit("allow turn");
    } else {
      return;
    }
  });

  socket.on("send pos", (lastPos) => {
    game.fillPos(lastPos[0], lastPos[1], gameState.currentColor);
    io.emit("update board", [lastPos, gameState.currentColor]);
    if (gameState.currentPlayer.id === gameState.players[0].id) {
      // switch turn logic //
      gameState.currentPlayer = gameState.players[1];
      gameState.currentColor = "yellow";
    } else {
      gameState.currentPlayer = gameState.players[0];
      gameState.currentColor = "red";
    }
    if (!game.win(lastPos[0], lastPos[1])) io.emit("update player", gameState.currentPlayer);
  });

  socket.on("finish game", () => {
    io.emit("send msg", `finished game: gameState is ${JSON.stringify(gameState)}`)
  });

  socket.on("rematch", () => {
    gameState.board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ]
    gameState.gameOver = false
    game = new Online.Board(gameState.board)
    io.emit("new game")
  })
});
