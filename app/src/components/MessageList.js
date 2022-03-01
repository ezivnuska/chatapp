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
} from './'
import { MaterialIcons } from '@expo/vector-icons'
import globalStore from '../../GlobalStore'
import axios from 'axios'
import { MessageItem } from './'
import socketIoClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:3000'

const MessageList = props => {
  const [messages, setMessages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [socketId, setSocketId] = useState(null)
  let socket

  const loadMessages = () => {
    console.log('loading messages')
    axios.get('http://localhost:3000/messages')
    .then(({ data }) => {
      console.log('fetch messages result', data.messages)
      setMessages(data.messages)
      setLoaded(true)
      setLoading(false)
    })
    .catch(err => console.log('error fetching messages', err))
  }

  const deleteMessage = messageId => {
    console.log('deleting message:', messageId)
    axios.delete(`http://localhost:3000/messages/${messageId}`)
    .then(result => {
      console.log('result', result)
      setLoaded(false)
      setLoaded(true)
      loadMessages()
    })
    .catch(err => console.log('error deleting message with id', messageId))
  }

  const connect = () => {
    if (socketId) return
    socket = socketIoClient(ENDPOINT, { transports: [ 'websocket' ] })
    socket.on('connect', () => {
      console.log('MessageList connected')
      console.log('MessageList socket', socket)
      setSocketId(socket.id)
      const socketId = socket.id
      const userId = globalStore.user._id
      const username = globalStore.user.username
      axios
      .post('http://localhost:3000/sockets', { userId, socketId, username })
      .then(({ data }) => {
        const { userId } = data.socket
        const roomId = data.socket._id
        console.log('socket', data.socket)
        
      })
      .catch(err => console.log('Error creating new Socket', err))
    })
    
    socket.on('message', msg => {
        console.log('...reloading messages', msg.body)
        loadMessages()
        setLoaded(false)
    })
  }

  const onDisconnect = () => {
    if (!socketId) return
    console.log('DISCONNECTING', socket)
    setSocketId(null)
    exit()
  }

  const exit = () => {
    console.log('DISCONNECTING')
    console.log('socketId...', socketId)
    axios
    .delete(`http://localhost:3000/sockets/${socketId}`)
    .then(result => {
      console.log('result on client', result)
      if (socketId) {
        // socket.disconnect()
        setSocketId(null)
        console.log('socket after disconnect', socket)
      }  
    })
    .catch(err => console.log('error on client deleting sockets', err))
  }

  useEffect(() => {

    if (!loaded && !loading) {
      setLoading(true)
      loadMessages()
    }

    return () => {
      if (connected) {
        console.log('exiting')
        console.log('socket on exit', socket)
        exit()
      }
    }
  }, [])

  const renderConnectButton = () => {
    console.log('rendering connect button', socket)
    return (
      <TouchableOpacity
        style={!socketId ? styles.button : styles.disabledButton}
        onPress={connect}
      >
            <Text style={!socketId  ? styles.buttonLabel : styles.disabledButtonLabel}>Connect</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StyledView>
        <Text style={styles.heading}>Messages</Text>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) => (
            <MessageItem
              item={item}
              deleteMessage={deleteMessage}
            />
          )}
        />
      </StyledView>
      
      {renderConnectButton()}

      <TouchableOpacity
        style={socketId ? styles.button : styles.disabledButton}
        onPress={onDisconnect}
      >
            <Text style={socketId ? styles.buttonLabel : styles.disabledButtonLabel}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MessageList

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
  button: {
    // flex: 1,
    height: 40,
    backgroundColor: '#F08E52',
    borderRadius: 10,
    shadowColor: '#2F1A0C',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginVertical: 10,
  },
  disabledButton: {
    // flex: 1,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 10,
    // shadowColor: '#2F1A0C',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    marginVertical: 10,
    cursor: 'default',
  },
  buttonLabel: {
    color: '#000',
    fontSize: 20,
    marginTop: 7,
    textAlign: 'center',
  },
  disabledButtonLabel: {
    color: '#fff',
    fontSize: 20,
    marginTop: 7,
    textAlign: 'center',
  },
})