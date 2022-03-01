import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import io from 'socket.io-client'
import SecureScreen from './SecureScreen'
import globalStore from '../../GlobalStore'
import axios from 'axios'
import { RoomList, SocketInfo } from '../components'

const ENDPOINT = 'http://localhost:3000'

const ChatScreen = props => {
    const [socket, setSocket] = useState(null)
    const [connected, setConnected] = useState(false)
    const [rooms, setRooms] = useState([])
    const [chats, setChats] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log('initializing socket')
        const ioSocket = io(ENDPOINT, {
            transports: ['websocket'],
            autoConnect: false,
        })
        console.log('setting socket', socket)
        setSocket(ioSocket)
    }, [])

    useEffect(() => {
        if (!socket) return
        console.log('socket initialized', socket)
        setSocket(socket)
        // socket.on('new connection', () => {
        //     console.log('new connection', socket)
        //     socket.emit('rooms')
        // })
        socket.on('connected', data => {
            socket.emit('getsocket')
            const { username } = globalStore.user
            socket.emit('adduser', {...data, username})
            console.log('adduser', {...data, username})
            // console.log('client received connect event', socket)
            setConnected(true)
            setSocket(socket)
            // console.log('*** connected:', username)
            // socket.emit('on connect', username)
            // socket.emit('room', { username })
        })

        socket.on('socket', rooms => {
            console.log('current rooms:', rooms)
        })

        socket.on('updatechat', (username, body) => {
            const chat = `${username}: ${body}`
            setChats([...chats, chat])
            console.log('updatechat', chat)
        })

        socket.on('updateusers', users => {
            setUsers(users)
            console.log('updateusers', users)
        })

        socket.on('disconnectuser', username => {
            setConnected(false)
            const array = users.map(user => {
                if (user.username === username) return user
            })
            setUsers(array)
        })

        socket.on('new connection', message => {
            console.log('new connection', message)
        })
        
        socket.on('update rooms', rooms => {
            console.log('update rooms', rooms)
            setRooms([...rooms])

        })

        socket.on('updates', updates => {
            console.log('UPDATES', updates)
        })

        // socket.on('connection', () => {
        //     console.log('connection')
        //     socket.emit('rooms')
        // })
    
        // socket.on('update rooms', rooms => {
        //     console.log('update rooms event heard:', rooms)
        //     setRooms([...rooms])
        // })
    
        socket.on('disconnected', () => {
            console.log('disconnected event heard from chat screen')
            setConnected(false)
            setSocket(socket)
            socket.emit('rooms')
        })
    
        socket.on('change', () => {
            console.log('CHANGE')
        })

        socket.on('joined', data => {
            console.log('joined', data)
        })

        socket.on('new room', room => {
            console.log('new room created', room)
        })

        socket.on('message', message => {
            console.log('message received', socket)
        })

    }, [socket])

    // const deleteSocket = socket => {
    //     axios
    //         .delete(`http://localhost:3000/sockets/${socket.id}`)
    //         .then(result => {
    //             console.log('result on client', result)
    //             if (socket.id) {
    //                 // socket.disconnect()
    //                 console.log('socket after disconnect', socket)

    //                 globalStore.setSocket(null)
    //                 setConnected(false)
    //             }
    //         })
    //         .catch(err => console.log('error on client deleting sockets', err))
    // }

    // const connect = () => {

    //     socket.on('connect', () => {
    //         console.log('Socket connected from ChatScreen', socket)
    //         globalStore.setSocket(socket)
    //         // const socketId = socket.id
    //         // const userId = globalStore.user._id
    //         // const username = globalStore.user.username
    //         // axios
    //         // .post('http://localhost:3000/sockets', { userId, socketId, username })
    //         // .then(({ data }) => {
    //         //   const { userId } = data.socket
    //         //   const roomId = data.socket._id
    //         //   console.log('socket', data.socket)

    //         // })
    //         // .catch(err => console.log('Error creating new Socket', err))
    //       })

    //     //   socket.on('message', msg => {
    //     //       console.log('...reloading messages', msg.body)
    //     //       loadMessages()
    //     //       setLoaded(false)
    //     //   })

    //     globalStore.setSocket(socket)
    // }

    const handleConnection = () => {
        console.log('handleConnection:socket', socket, connected)
        if (!socket) console.log('handleConnection:no socket')
        if (!connected) {
            console.log('connecting')
            socket.connect()
        }
        else {
            console.log('disconnecting')
            socket.disconnect()
        }
        
        
        // if (!globalStore.socket) {
        //     socket = socketIoClient(ENDPOINT, { transports: ['websocket'] })
        //     socket.on('connected', allRooms => {
        //         console.log('*client:connected*', allRooms)
        //         setRooms(allRooms)
        //     })
        //     socket.on('connect', () => {
        //         const socketId = socket.id
        //         const userId = globalStore.user._id
        //         const username = globalStore.user.username
        //         socket.emit('join', username)
        //         // axios
        //         // .post('http://localhost:3000/sockets', { userId, socketId, username })
        //         // .then(({ data }) => {
        //         //     const { socketId, userId } = data.socket
        //         //     console.log('saved socket:', data.socket)
                    
        //         //     setConnected(true)
        //         //     globalStore.setSocket(socket)
        //         // })
        //         // .catch(err => console.log('Error creating new Socket', err))
        //     })
        //     socket.on('change', allRooms => {
        //         console.log('*client:change*', allRooms)
        //         setRooms(allRooms)
        //         globalStore.setSocket(socket)
        //         const rooms = socket.adapter ? socket.adapter.rooms : null
        //         console.log('socket.rooms', rooms)
        //     })
        //     socket.on('disconnect', () => {
        //         console.log('*client:disconnect*')
        //     })
        //     globalStore.setSocket(socket)
        // } else if (socket && !socket.connected) {
        //     socket.connect()
        // }
        // else {
        //     deleteSocket(socket)
        //     socket.disconnect()
        // }
    }

    const handleDisconnect = () => {
        if (socket && socket.connected) socket.disconnect()
    }

    return (
        <View style={styles.marginalized}>
            
            <View style={styles.rowContainer}>
                <Text style={styles.heading}>Chat Screen</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleConnection}
                >
            
                    <Text style={styles.buttonLabel}>{connected ? 'Disconnect' : 'Connect'}</Text>
                </TouchableOpacity>
            </View>

            {socket && (
                <View style={styles.socketInfo}>
                    <Text style={styles.socketInfo}>Socket {connected ? ' - CONNECTED' : ' - DISCONNECTED'}</Text>
                    {connected && <Text style={styles.socketInfo}>ID: {socket.id}</Text>}
                </View>
            )}

            <ul>
            {/*users.map((user, i) => {
                return (
                    <li key={i}>{user}</li>
                )
            })*/}
            </ul>

            {users.length ? (
                <RoomList rooms={users} />
            ) : null}

            <SocketInfo socket={socket} />

            

        </View>
    )
}

export default SecureScreen(ChatScreen)

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    heading: {
        marginTop: 10,
        lineHeight: 40,
        height: 40,
        // marginHorizontal: 10,
        fontWeight: 600,
        fontSize: '1.5rem',
        flex: 1,
        // borderWidth: 1,
    },
    button: {
        flex: 1,
        height: 40,
        backgroundColor: '#F08E52',
        borderRadius: 10,
        shadowColor: '#2F1A0C',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        marginVertical: 10,
        // marginHorizontal: 5,
    },
    buttonLabel: {
        color: '#000',
        fontSize: 20,
        marginTop: 7,
        textAlign: 'center',
    },
    marginalized: {
        paddingHorizontal: 20,
    },
    socketInfo: {
        color: 'red',
        fontWeight: 600,
        fontSize: '1.5rem',
    }
})