const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const SocketSchema = new Schema({
    socketId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    connectedUserId: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    }
})

const SocketModel = mongoose.model('Socket', SocketSchema)

module.exports = SocketModel