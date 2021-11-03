import React, { useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { action } from 'mobx'
import axios from 'axios'
import useIsMounted from 'ismounted'

const SecureScreen = Component => props => {
    const initialState = {
        authenticated: false,
        authenticating: false,
    }
    
    const [state, setState] = useState(initialState)
    const isMounted = useIsMounted()

    const authenticate = async () => {
        console.log('authenticating...', props)
        setState({
            ...state,
            authenticating: true,
        })
        const userToken = await AsyncStorage.getItem('userToken')
        console.log(userToken, 'userToken')
        if (userToken) {
            await axios
                .post('http://localhost:3000/authenticate', { userToken })
                .then(action(({ data }) => {
                    console.log(`SecureScreen: ${props.route.name}:`)
                    const { user } = data
                    if (!user) throw new Error('Error: could not authenticate user', data)
                    if (isMounted.current) {
                        setState({
                            authenticated: true,
                            authenticating: false,
                        })
                    }
                }))
                .catch(err => {
                    console.log('Error getting user', err)
                    console.log('props...', props)
                    props.navigation.navigate('Auth')
                })
        }
        else props.navigation.navigate('Auth')
    }
    
    if (!state.authenticated && !state.authenticating) authenticate()
    return (
        <View style={styles.container}>
            {state.authenticated
                ? <Component {...props} />
                : <ActivityIndicator size='large' />
            }
        </View>
    )
}

export default SecureScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})