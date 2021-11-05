import React, { useEffect, useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import { UserDetails } from '.'
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

  const loadMessages = () => {
    axios.get('http://localhost:3000/messages')
    .then(({ data }) => {
      console.log('fetch messages result', data.messages)
      setMessages(data.messages)
      setLoaded(true)
      setLoading(false)
    })
    .catch(err => console.log('error fetching messages', err))
  }

  useEffect(() => {

    if (!loaded && !loading) {
      setLoading(true)
      loadMessages()
    }
    
    const socket = socketIoClient(ENDPOINT, { transports: [ 'websocket' ] })

    socket.on('connect', () => {
      console.log('MessageList connected')
    })
    
    socket.on('message', () => {
        console.log('...reloading messages')
        loadMessages()
        setLoaded(false)
    })

    return () => socket.disconnect()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => {
          console.log('item', item)
          return (
            <MessageItem item={item} />
          )
        }} 
      />
    </View>
  )
}

export default MessageList

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  username: {
    marginTop: 3,
    fontSize: 20,
    color: 'blue',  
  },
  body: {

  },
})