const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const session = require('express-session')
const jwt = require('jsonwebtoken')

const SESSION_SECRET = require('./config').JWT_SECRET
const db = require('./config').DB_CONNECTION_STRING
const PORT = process.env.PORT || 3000

const Users = require('./models/User')
const Messages = require('./models/Message')

const MessageRouter = require('./routers/Messages')
const SocketRouter = require('./routers/Sockets')

const { createServer } = require('http')
const { Server } = require('socket.io')
const app = express()
const server = createServer(app)
const io = new Server(server, {})

// const { createSocket } = require('dgram')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

const createToken = (user, secret, expiresIn) => {
    const { _id, username, email } = user
    return jwt.sign({
        _id, username, email
    }, secret, { expiresIn })
}

MessageRouter(app, io)
SocketRouter(app, io)

const usernames = []

const sendToAllSockets = (event, data) => {
    console.log('sendToAllSockets', event, data)
    io.sockets.emit(event, data)
}

io.on('connection', socket => {
    console.log('connection event', usernames)
    // socket.send('\nsocket connected successfully', socket.id)
    // console.log('\nsocket connected successfully', socket.id)
    // console.log('\nsocket rooms', socket.rooms)
    // console.log('socket.rooms on connection', socket.rooms)
    // io.sockets.emit('updateusers', usernames)
    sendToAllSockets('connected', usernames)
    // socket.emit('rooms', socket.rooms)
    // io.sockets.emit('change', socket.rooms)
    // io.sockets.emit('connected', socket.rooms)
    // const clients = io.sockets
    // clients.sockets.forEach(( data, counter ) => {

    //     // console.log(data)//maps
        
    //     var socketid =  data.id//log ids
    //     var isConnected = data.connected//true,false;
    //     // console.log('socketid', socketid)
    // })

    socket.on('adduser', user => {
        console.log('>>> socket.on... user:', user)
        socket.username = user.username
        if (usernames.indexOf(user.username) === -1) {
            console.log('usernames:', usernames)
            console.log('pushing username:', user.username)
            usernames.push(user.username)
            console.log('usernames:', usernames)
        }
        // socket.emit('updatechat', 'SERVER', 'you have connected')
        // io.sockets.emit('updateusers', usernames)
        // sendToAllSockets('updateusers', usernames)
    })

    socket.on('sendchat', data => {
        // io.sockets.emit('updatechat', socket.username, data)
        sendToAllSocketsconsole.log('updatechat', socket.username, data)
        console.log('updatchat', socket.username, data)
    })

    socket.on('disconnect', () => {
        delete usernames[socket.username]
        io.sockets.emit('updateusers', usernames)
        io.sockets.emit('disconnected', socket.username)
        socket.broadcast.emit('disconnectuser', socket.username)
    })


    // socket.on('join', args => {
    //     socket.join(args)
    //     console.log('joined: args:', args)
    //     // io.sockets.to(args).emit('message', `joined ${args}`)
    //     io.sockets.emit('message', `joined ${args}`)
    // })

    // socket.on('on connect', id => {
    //     console.log('new connection', id)
    //     // console.log('...', socket.adapter.rooms)

    //     socket.join(id)
    //     // console.log('io.sockets', io.sockets)

    //     io.sockets.to(id).emit('message', {
    //         type: 'status',
    //         text: 'Is now connected',
    //         created: Date.now(),
    //         sockets: socket.adapter.rooms,
    //     })

    //     const roomArray = Array.from(socket.adapter.rooms).map(room => {
    //         return room[0]
    //     })
    //     console.log('roomArray', roomArray)
    //     io.sockets.emit('update rooms', roomArray)
    // })
    // const rooms = socket.rooms
    // console.log('roooooms', rooms)
    // socket.on('room', room => {
    //     console.log('roome event heard on server', room)
    //     console.log('roome event heard on server', io.sockets)
    //     socket.join(room)
    //     const connections = io.in(room).fetchSockets()
    //     io.sockets.emit('new room', room, connections)
    // })

    // socket.on('rooms', () => {
    //     console.log('server heard rooms event from client, emitting update rooms event', socket.adapter.rooms)
    //     const roomArray = Array.from(socket.adapter.rooms).map(room => {
    //         console.log('...', room)
    //         return { name: room[0] }
    //     })
    //     console.log('roomArray', roomArray)
    //     io.sockets.emit('update rooms', roomArray)
    //     console.log('io.sockets', io.sockets.sockets)

    // })

    // socket.on('room', roomId => {
    //     console.log('joining room', roomId)
    //     socket.join(roomId)
    //     console.log('socket.roms', socket.rooms)
    //     io.sockets.emit('connection')
    // })

    // socket.on('room', ({ username }) => {
    //     console.log('server event: room:', username)
    //     // socket.join(username)
    //     // console.log('socket.adapter.rooms', socket.adapter.rooms)
    //     const rooms = Array.from(socket.adapter.rooms).map(room => {
    //         return room
    //     })
    //     // socket.emit('message', rooms)
    // })

    // socket.on('message', data => {
    //     console.log('data', data)
    //     io.sockets.emit('message', data)
    // })

    // socket.on('join', room => {
    //     // console.log('room created', room)
    //     console.log('joining room', room)
    //     socket.join(room)
    //     socket.emit('joined', socket.rooms)
    //     console.log('***', socket.rooms)
    //     // socket.adapter.rooms
    //     // const rooms = getActiveRooms(io)
    // })

    // socket.on('disconnect', () => {
    //     console.log('disconnected')
    //     io.sockets.emit('disconnected')
    // })

    // socket.on('update', async () => {
    //     const rooms = await io.sockets.in(socket.id).fetchSockets()
    //     io.sockets.in(socket.id).emit('updates', rooms)
    //     console.log('result-->', rooms)
    // })
})

const getActiveRooms = (io) => {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(io.sockets.adapter.rooms)
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter(room => !room[1].has(room[0]))
    // Return only the room name: 
    // ==> ['room1', 'room2']
    const res = filtered.map(i => i[0])
    return res
}

// app.post('/message', (req, res) => {
//     const { userId, username, body } = req.body
//     console.log('req.body', userId, username, body)
//     const newMessage = {
//         userId,
//         username,
//         body,
//     }
//     // save to db
//     Messages
//     .create(newMessage)
//     .then(message => {
//         console.log('message...', message)
//         if (!message) throw new Error();
        
//         io.sockets.emit('message', message)
//         res.status(200).json({
//             success: true,
//             message,
//         })
//     })
//     .catch(err => console.log('Error creating new user.', err))

// })

// app.get('/messages', (req, res) => {
//     Messages
//     .find({})
//     .then(result => {
//         console.log('result', result)
//         res.status(200).json({
//             success: true,
//             messages: result,
//         })
//     })
//     .catch(err => console.log('error fetching all messages'))
// })

app.post('/signup', (req, res) => {
    console.log('password', req.body.password)
    bcrypt.hash(req.body.password, 10, (err, hashedPW) => {
        if (err) {
            res.status(422).json({'error': err});
        } else {
            const user = req.body;
            const email = user.email
            Users
            .findOne({ email })
            .then(result => {
                if (result) {
                    alert('A user with that email already exists.')
                    res.status(200).json({
                        success: false,
                    })
                }
                else {
                    console.log('hashed password', hashedPW)
                    user.password = hashedPW;
                    Users
                        .create(user)
                        .then((result) => {
                            if (!result) throw new Error();
                            const { user } = result.data
                            req.session.token = createToken(user, SESSION_SECRET, '24hr')
                            req.user = user
                            // user.password cound not be deleted, change to undefined to hide the password
                            req.user.password = undefined
                            req.user.__v = undefined
                            res.status(200).json({
                                success: true,
                                user,
                            })
                        })
                        .catch(err => console.log('Error creating new user.', err))
                }
            })
            .catch(err => console.log('Error: User already exists.'))
        }
    })
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body
    console.log('signing in with email and password:', email, password)
    Users
    .findOne({ email })
    .then(result => {
        console.log('result', result)
        const { _id, email, username } = result
        const hashedPW = result.password
        const user = { _id, email, username }
        bcrypt
            .compare(password, hashedPW)
            .then(result => {
                console.log('result', result)
                if (!result) throw new Error();
                console.log('it worked! passwords match!')
                req.session.token = createToken(user, SESSION_SECRET, '24hr')
                req.user = user
                Users
                    .findOneAndUpdate({ _id }, { $set: { connected: true, token: req.session.token } }, { new: true })
                    .then(newUser => {
                        console.log('user signed in:', req.user)
                        res.json({
                            success: true,
                            user: req.user,
                        })
                    })
                    .catch(err => {
                        console.log('err', err)
                        res.json({
                            success: false,
                            err,
                        })
                    })
                // user.password cound not be deleted, change to undefined to hide the password
                // req.user.password = undefined
                // req.user.__v = undefined
            })
            .catch(err => console.log('Failed when comparing password', password, hashedPW, err))
        })
        .catch(err => res.json({msg: 'Failed to find the user'}))
})

app.post('/authenticate', (req, res) => {
    const { body, session } = req
    const { userToken } = body
    const { token } = session
    if (token) {
        // console.log('session token found')
        res.status(200).json({
            user: decodeUser(token)
        })
    } else {
        // console.log('session token not found')
        if (userToken) {
            // console.log('userToken found', userToken)
            Users
                .findOne({ _id: userToken })
                .then(result => {
                    req.session.token = createToken(result, SESSION_SECRET, '24hr')
                    req.user = result
                    // user.password cound not be deleted, change to undefined to hide the password
                    req.user.password = undefined
                    req.user.__v = undefined
                    res.status(200).json({
                        success: true,
                        user: result
                    })
                })
                .catch(err => console.log('Error finding user with userToken', userToken, err))
        }
    }
    // Users
    //     .findById(user._id)
    //     .then(result => res.status(200).json(result))
    //     .catch(err => console.timeLog('Error getting users.', err))
})

app.post('/signout', (req, res) => {
    const { session, user } = req
    console.log('signout on server, session:', session)
    console.log('signout on server, req.user:', user)
    console.log('signout on server, req.session.token:', session.token)
    Users
        .findOneAndUpdate({ _id: session.token }, {
            $set: {
                connected: false,
                token: null,
            }
        }, { new: true, })
        .then(result => {
            console.log('signout result...', result)
            delete req.session.token
            delete req.user
            res.json({
                success: true,
                msg: 'User Signed Out',
            })
        })
        .catch(err => {
            console.log('err', err)
            res.json({
                success: false,
                err,
            })
        })
})

app.get('/users', (req, res) => {
    console.log('getting users')
    Users
    .find({})
    .then(result => {
        console.log('all users', result)
        res.json({
            users: result,
        })
    })
})

mongoose.Promise = global.Promise
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
    })
    .then(() => console.log('MongoDB connected\n\n\n'))
    .catch(err => console.log('Error connecting to database', err))

server.listen(PORT, () => console.log(`\n\n\nserver listen on ${PORT}\n`))