import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import globalStore from '../../GlobalStore'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import socketIoClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:3000'

const { height } = Dimensions.get('window')

const ChatForm = props => {
    const [ response, setResponse ] = useState({})

    const { control, handleSubmit, formState: { errors } } = useForm()

    const { _id, username } = globalStore.user
    
    useEffect(() => {
        
    }, [])

    const send = ({ message }) => {
        console.log('sending message')
        if (!message || !message.length) return
        console.log('message: ', message)
        const newMessage = {
            userId: _id,
            username,
            body: message,
        }

        axios.post('http://localhost:3000/message', newMessage)
        .then(result => {
            console.log('new message result', result)
        })
        .catch(err => console.log('could not send chat'))
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Text style={styles.label}>Chat</Text>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Say something...'
                            autoCapitalize='none'
                        />
                    )}
                    name='message'
                    defaultValue=''
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(send)}
                >
                    <Text
                    style={styles.buttonLabel}
                    accessibilityLabel='Sign In'>
                        Send
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default ChatForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
    },
    content: {
        padding: 20,
    },
    link: {
        fontSize: 20,
        marginTop: 3,
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // marginBottom: 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      // borderStyle: 'solid',
      // borderBottomWidth: 1,
      // borderBottomColor: '#aaa',
    },
    label: {
      fontSize: 20,
      fontWeight: '600',
      padding: 5,
    },
    input: {
        height: 40,
        color: '#000',
        paddingHorizontal: 10,
        fontSize: 18,
        lineHeight: 23,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ccc',
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
    // marginHorizontal: 5,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 20,
    marginTop: 7,
    textAlign: 'center',
  },
})