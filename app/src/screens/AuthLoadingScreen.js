import React from 'react'
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
        console.log('Token found in AsyncStorage. Authenticating user.')
        axios
            .post('http://localhost:3000/authenticate', { userToken })
            .then(action(({ data }) => {
                // console.log('Authenticated user result:', data)
                const { user } = data
                if (!user) throw new Error('Error: coulld not authenticate user', data)
                const { _id, email, username } = user
                const authenticatedUser = { _id, email, username }
                console.log('Authenticated user:', authenticatedUser.username)
                globalStore.updateUser(authenticatedUser)
                props.navigation.navigate('App')
            }))
            .catch(err => {
                console.log('Error getting user', err)
                props.navigation.navigate('Auth')
            })
    } else {
        console.log('No userToken found in local storage. Navigting to Auth.')
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