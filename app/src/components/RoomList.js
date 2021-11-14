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
  const [ loaded, setLoaded ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ rooms, setRooms ] = useState([])

  const loadRooms = () => {
    setLoading(true)
    axios.get('http://localhost:3000/sockets')
    .then(({ data }) => {
      console.log('result from socket fetch', data.sockets)
      setRooms(data.sockets)
      setLoaded(true)
      setLoading(false)
    })
    .catch(err => console.log('Error fetching sockets', err))
  }

  const signout = () => {
    axios
    .post('http://localhost:3000/signout')
    .then(({ data }) => {
        if (!data.success) throw new Error('Error signing out')

        AsyncStorage.removeItem('userToken', err => console.log(err ? `Error clearing AsyncStorage, ${err}` : 'AsyncStorage cleared'))
        .then(action(() => {
            globalStore.updateUser({
                username: '',
                email: '',
                thumbnail: '',
                _id: '',
            })
            console.log('logged out')
            
            props.navigation.navigate('Auth')
        }))
    })
    .catch(err => console.log('logout failed:', err))
}

const joinRoom = roomId => {
  const socket = socketIoClient(ENDPOINT, { transports: [ 'websocket' ] })
  console.log('attempting to join room', roomId, socket)
  axios
  .put('http://localhost:3000/sockets', { roomId })
  .then(result => {
    console.log('put result', result)
  })
  .catch(err => console.log('error putting', err))
} 

  useEffect(() => {
    
    const socket = socketIoClient(ENDPOINT, { transports: [ 'websocket' ] })
    console.log('ROOMLIST', socket)
    socket.on('connect', () => {
      console.log('RoomList connected')

      const { username } = globalStore.user
      console.log('current user', username)
      // socket.emit('create', username)  

      if (!loading && !loaded) {
        loadRooms()
      }

      socket.on('new socket', sock => {
        console.log('sock', sock)
        loadRooms()
      })

      socket.on('disconnect', () => {
        console.log('disconnecting')
      })

      socket.on('change', () => {
        console.log('disconnected')
        loadRooms()
      })
      
    })

    // return () => {
    //   console.log('RoomList disconnecting in useEffect', socket)
    //   socket.disconnect()
    // }
  }, [])

  return (
    <View style={styles.container}>
      <StyledView>
        <Text style={styles.heading}>Rooms</Text>
        <FlatList
          data={rooms}
          keyExtractor={(item, index) => 'roomKey' + index}
          renderItem={({ item }) => (
            <Room room={item} join={joinRoom} />
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