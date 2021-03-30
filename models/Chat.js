const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', ChatSchema)
module.exports = {Chat}