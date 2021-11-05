const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    userId: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

const MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel
