import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import axios from 'axios'
import globalStore from '../../GlobalStore'
import AsyncStorage from '@react-native-community/async-storage'

const SignoutButton = props => {

    const signout = () => {
        axios
        .post('http://localhost:3000/signout')
        .then(({ data }) => {
            if (!data.success) throw new Error('Error signing out')
            console.log('data', data)
            AsyncStorage.removeItem('userToken', err => console.log(err ? `Error clearing AsyncStorage, ${err}` : 'AsyncStorage cleared'))
            .then(result => {
                globalStore.updateUser({
                    username: '',
                    email: '',
                    thumbnail: '',
                    _id: '',
                    connected: false,
                    token: null,
                })
                console.log('logged out')
                
                props.navigation.navigate('Auth')
            })
        })
        .catch(err => console.log('logout failed:', err))
    }

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={signout}
        >
            <Text
                style={styles.buttonLabel}
                accessibilityLabel='Disconnect'
            >
                Disconnect
            </Text>
        </TouchableOpacity>
    )
}

export default SignoutButton

const styles = StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: '#F08E52',
        borderRadius: 10,
        shadowColor: '#2F1A0C',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        marginVertical: 10,
    },
    buttonLabel: {
        color: '#000',
        fontSize: 20,
        marginTop: 7,
        textAlign: 'center',
    },
})