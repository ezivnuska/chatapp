import React, { useEffect, useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import {
  StyledView,
  UserDetails,
  Room,
} from './'
import AsyncStorage from '@react-native-community/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import globalStore from '../../GlobalStore'
import axios from 'axios'
import { MessageItem } from '.'
import socketIoClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:3000'

const RoomList = props => {
  console.log('*', props)
  const [ loaded, setLoaded ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  // const loadRooms = () => {
  //   setLoading(true)
  //   axios.get('http://localhost:3000/sockets')
  //     .then(({ data }) => {
  //       console.log('result from socket fetch', data.sockets)
  //       setRooms(data.sockets)
  //       setLoaded(true)
  //       setLoading(false)
  //     })
  //     .catch(err => console.log('Error fetching sockets', err))
  // }

  const joinRoom = roomName => {
    const socket = socketIoClient(ENDPOINT, { transports: [ 'websocket' ] })
    const socketId = socket.id
    console.log('\nattempting to join room', roomName)
    const username = globalStore.user.username
    console.log('room name-----', username)
    socket.emit('join', username)
    // axios
    // .put(`http://localhost:3000/sockets/join/${socketId}`, { userId })
    // .then(result => {
    //   console.log('join result', result)
    // })
    // .catch(err => console.log('error putting', err))
  }

  // const leaveRoom = socketId => {
  //   const socket = socketIoClient(ENDPOINT, { transports: [ 'websocket' ] })
  //   console.log('\nattempting to leve room', socket)
  //   const userId = globalStore.user._id
  //   axios
  //   .put(`http://localhost:3000/sockets/join/${socketId}`, { userId })
  //   .then(result => {
  //     console.log('leave result', result)
  //   })
  //   .catch(err => console.log('error putting', err))
  // }

  const deleteRoom = socketId => {
    // console.log('deleting room with socketId:', socketId)
    // axios
    // .delete(`http://localhost:3000/sockets/${socketId}`)
    // .then(result => {
    //     console.log('delete result:', result)
    //   })
    //   .catch(err => console.log('Error:', err))
  }

  // const connectSocket = () => {
  //   const socket = socketIoClient(ENDPOINT, { transports: [ 'websocket' ] })


  //   socket.on('connect', rooms => {
  //     console.log('RoomList connected', rooms)
  //     setRooms(rooms)
  //     const { username } = globalStore.user
  //     console.log('current user', username)
  //     // socket.emit('create', username)  

  //     // if (!loading && !loaded) {
  //     //   loadRooms()
  //     // }
  //   })

  //   socket.on('new socket', sock => {
  //     console.log('ROOMLIST: new socket', sock)
  //     // loadRooms()
  //   })

  //   socket.on('disconnect', data => {
  //     console.log('ROOMLIST: disconnecting', data)
  //   })

  //   socket.on('change', data => {
  //     console.log('ROOMLIST: change', data)
  //     // loadRooms()
  //   })

  //   globalStore.setSocket(socket)
  //   console.log('ROOMLIST', globalStore.socket)
  // }

  // const disconnectSocket = () => {
  //   const socket = globalStore.socket
  //   console.log('RoomList disconnecting socket', socket)
  //   socket.disconnect()
  // }

  useEffect(() => {
    console.log('rooms-->', props.rooms)
  }, [])

  return (
    <View style={styles.container}>
      <StyledView>
        <Text style={styles.heading}>Rooms</Text>
        <FlatList
          data={props.rooms}
          keyExtractor={(item, index) => 'roomKey' + index}
          renderItem={({ item }) => (
            <Room
              room={item}
              joinRoom={joinRoom}
              deleteRoom={deleteRoom}

            />
          )}
        />
      </StyledView>
    </View>
  )
}

export default RoomList

const styles = StyleSheet.create({
  container: {
    // margin: 20,
    borderWidth: 1,
    borderColor: 'black',
    flexGrow: 1,
    // backgroundColor:'gray',
  },
  username: {
    marginTop: 3,
    fontSize: 20,
    color: 'blue',  
  },
  body: {

  },
})