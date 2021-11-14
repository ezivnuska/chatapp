// const express = require('express')
const Sockets = require('../../models/Socket')

const SocketRouter = (app, io) => {

    app.post('/sockets', (req, res) => {
        const { socketId, userId,  username } = req.body
        console.log('socketId, userId, username:', socketId, userId, username)
        const newSocket = {
            userId,
            socketId,
            username,
        }
        
        Sockets
        .create(newSocket)
        .then(socket => {
            console.log('Socket...', socket)
            if (!socket) throw new Error();
            
            io.sockets.emit('new socket', socket)
            res.status(200).json({
                success: true,
                socket,
            })
        })
        .catch(err => console.log('Error creating new socket.', err))
    })
    
    app.put('/sockets', (req, res) => {
        console.log('updating socket', req.body.socket)
        const { _id, userId } = req.body.socket
        Sockets
            .findOneAndUpdate({ _id }, { connectedUserId: userId }, { new: true })
            .then(socket => {
                console.log('put socket----', socket)
                res.status(200).json(socket)
            })
            .catch(err => console.log('Error updating socket', err))
    })

    app.get('/sockets', (req, res) => {

        Sockets
        .find({})
        .then(result => {
            // console.log('result', result)
            res.status(200).json({
                success: true,
                sockets: result,
            })
        })
        .catch(err => console.log('error fetching all sockets'))
    })
    
    app.delete('/sockets/:id', (req, res) => {
        console.log('req.params', req.params)
        const { id } = req.params
        console.log('deleting socket with id:', id)
        
        Sockets
        .findOneAndDelete({ socketId: id, }, {
            useFindAndModify: false,
        })
        .then(result => {
            console.log('Socket deleted', result)
            io.sockets.emit('change')
            res.status(200).json({ result })
        })
        .catch(err => console.log('Error deleting Socket:', err))
            
    })
}


module.exports = SocketRouter