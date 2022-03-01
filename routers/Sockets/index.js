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
            .find({ userId })
            .then(existingSocket => {
                if (existingSocket) {
                    Sockets
                        .findByIdAndDelete(existingSocket._id)
                        .then(deletedSocket => {
                            if (!deletedSocket) console.log('no existing sockets')
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
                        .catch(err => console.log('Error deleting socket before creation:', err))
                } else {
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
                }
            })
        
    })
    
    app.put('/sockets/join/:socketId', (req, res) => {
        const { socketId } = req.params
        const { userId } = req.body
        console.log('***', req.body)
        console.log(`userId ${userId} joining socket ${socketId}`)
        
        Sockets
        .findOne({ socketId })
        .then(socket => {
            console.log('found socket:', socket)
            if (!socket) {
                console.log('Error: no socket found to join')
                return res.json(null)
            }
            // const { socketId } = socket
            Sockets
                .findOneAndUpdate({ socketId: socket.socketId }, { $set: { connectedUserId: userId } }, { new: true })
                .then(sock => {
                    console.log('\njoined room', sock)
                    res.status(200).json(sock)
                })
                .catch(err => console.log('Error updating socket', err))
        })
    })
    
    app.put('/sockets/leave/:socketId', (req, res) => {
        const { socketId } = req.params
        const { userId } = req.body
        console.log(`userId ${userId} leaving socket ${socketId}`)
        
        Sockets
        .findOne({ socketId })
        .then(socket => {
            if (!socket) {
                console.log('Error: no socket found to leave')
                res.json(null)
            }
            const { socketId, userId } = socket
            console.log('socket:', socket, userId)
            Sockets
                .findOneAndUpdate({ socketId: socket.socketId, connectedUserId: userId }, { $set: { connectedUserId: null } }, { new: true })
                .then(sock => {
                    console.log('\nleft room...', sock)
                    res.status(200).json(sock)
                })
                .catch(err => console.log('Error updating socket', err))
        })
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
    
    app.delete('/sockets/:socketId', (req, res) => {
        console.log('req.params', req.params)
        const { socketId } = req.params
        console.log('deleting socket with socketId:', socketId)
        
        Sockets
        .findOneAndDelete({ socketId }, {
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