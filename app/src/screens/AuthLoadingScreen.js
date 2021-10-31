import React, { Component } from 'react'
import { 
    View,  
    StyleSheet, 
    ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { action } from 'mobx'
import globalStore from '../../GlobalStore'
import axios from 'axios'

const loadApp = async props => {
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken) {
        console.log('Token found in AsyncStorage. Authenticating user', userToken)
        axios
            .post('http://localhost:3000/authenticate', { userToken })
            .then(action(({ data }) => {
                console.log('Authenticated user result:', data)
                const { user } = data
                console.log('user...', user)
                if (!user) throw new Error('Error: coulld not authenticate user', data)
                const { _id, email, username } = user
                const authenticatedUser = { _id, email, username }
                console.log('Authenticated user:', authenticatedUser)
                globalStore.updateUser(authenticatedUser)
                props.navigation.navigate('App')
            }))
            .catch(err => {
                console.log('Error getting user', err)
                props.navigation.navigate('Auth')
            })
    } else {
        console.log('navigting to Auth')
        props.navigation.navigate('Auth')
    }
}

const AuthLoadingScreen = props => {
    
    loadApp(props)

    return (
        <View style={styles.container}>
            <ActivityIndicator /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
})


export default AuthLoadingScreen