const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const passport = require("passport");
const users = require("./routes/api/users");
const chat = require("./routes/api/chat");
const server = require("http").createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
const {Chat} = require("./models/Chat")

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

app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  

io.on("connection", socket => {
  // chatbox sockets
  socket.on("Input Chat Message", msg => { 
    connect.then(db => {
      try {
        let chat = new Chat({ message: msg.chatMessage, sender: msg.userId, type: msg.type})
        chat.save((err, doc) =>{
          if (err) return res.json({success: false, err})
          Chat.find({"_id": doc._id})
          .populate("sender")
          .exec((err,doc) => {
            return io.emit("Output Chat Message", doc)
          })
        })
      }catch(error){
        console.error(error)
      }
    })
  })

  // testing socket in game component
  socket.on("current color", color => {
    return(socket.emit("test", color))
  })

  
})
  
  
  app.use(passport.initialize());
  require("./config/passport")(passport);
  
  app.use("/api/users", users);
  app.use("/api/chat", chat)
