const express = require("express");
const router = express.Router();
const {Chat} = require("../../models/Chat");

router.get("/getChats", (req, res) => {
    Chat.find()
        .populate('sender')
        .exec((err, chats) =>{
            if (err) return res.status(400).send(err)
            res.status(200).send(chats)
        })
})

router.delete("/resetChats", (req, res) => {
   Chat.remove({}, function(err,chat){
       if (err) return console.error(err);
       console.log('User successfully removed from polls collection!');
       res.status(200).send();
   })
})

module.exports = router;