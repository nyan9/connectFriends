const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const GameSchema = new Schema(
    {
        message: {
            type: String,
        },
        Players: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        type: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Game = mongoose.model('Game', GameSchema)
module.exports = { Game }