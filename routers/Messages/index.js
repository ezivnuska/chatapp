// const express = require('express')
const Messages = require('../../models/Message')

const MessageRouter = (app, io) => {

    app.post('/message', (req, res) => {
        const { userId, username, body } = req.body
        console.log('req.body', userId, username, body)
        const newMessage = {
            userId,
            username,
            body,
        }
        
        Messages
        .create(newMessage)
        .then(message => {
            console.log('message...', message)
            if (!message) throw new Error();
            
            io.sockets.emit('message', message)
            res.status(200).json({
                success: true,
                message,
            })
        })
        .catch(err => console.log('Error creating new message.', err))
    })
    
    app.get('/messages', (req, res) => {

        Messages
        .find({})
        .then(result => {
            // console.log('result', result)
            res.status(200).json({
                success: true,
                messages: result,
            })
        })
        .catch(err => console.log('error fetching all messages'))
    })
    
    app.delete('/messages/:id', (req, res) => {
        console.log('req.params', req.params)
        const { id } = req.params
        console.log('deleting message with id:', id)
        
        Messages
        .findOneAndDelete({ _id: id, }, {
            useFindAndModify: false,
        })
        .then(result => {
            console.log('message deleted', result)
            res.status(200).json({ result })
        })
        .catch(err => console.log('Error deleting message:', err))
            
    })
}


module.exports = MessageRouter