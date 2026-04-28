const express = require("express");
const router = express.Router();
const { Chat } = require("../../models/Chat");

router.get("/getChats", async (req, res) => {
  try {
    const chats = await Chat.find().populate("sender");
    res.status(200).send(chats);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/resetChats", async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
