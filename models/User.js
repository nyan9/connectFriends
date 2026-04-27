const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    friendsList: [
      {
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        friendName: { type: String, default: "" },
      },
    ],
    stats: {
      wins: {
        type: Number,
        default: 0,
      },
      losses: {
        type: Number,
        default: 0,
      },
      ties: {
        type: Number,
        default: 0,
      },
    },
    elo: {
      type: Number,
      default: 1200,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
