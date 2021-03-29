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
    // stats: {
    //   wins: {
    //     type: Number,
    //     required: true,
    //   },
    //   losses: {
    //     type: Number,
    //     required: true,
    //   },
    //   ties: {
    //     type: Number,
    //     required: true,
    //   },
    // },
    // elo: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
