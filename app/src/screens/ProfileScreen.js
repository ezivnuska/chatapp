import React, { useState } from 'react'
import { 
    Text, 
    TouchableOpacity,
    StyleSheet, 
    View, 
 } from 'react-native'
 import AsyncStorage from '@react-native-community/async-storage'
import { StackActions } from '@react-navigation/native'

import axios from 'axios'
import globalStore from '../../GlobalStore'
import { action } from 'mobx'

import SecureScreen from './SecureScreen'

const ProfileScreen = props => {
    const [ isVisible ] = useState(false)

    const resetDrawerNavigator = () => {
        props.navigation.dispatch(StackActions.popToTop())
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
    
    const { user } = globalStore
    
    console.log('globalStore', globalStore)

    return (
        <View style={styles.container}>
            <View>
                <Text>{user.username}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.shadow,
                    {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#681515',
                        shadowRadius: 1,
                    }
                ]}>
                <Text
                    onPress={signout}
                    style={styles.signOut}
                >
                    Sign Out
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default SecureScreen(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerChildrenVertically: {
        height: 150,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    centeredItem: {
        
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    profile: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 300,
        width: 350,
        borderRadius: 20,
        marginRight: 12,
        backgroundColor: '#5BBC93',
    },
    frame: {
        width: 130,
        height: 130,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    infoFrame: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 110,
        height: 110,
        borderRadius: 10,
    },
    signOut: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        fontSize: 20,
        padding: 5,
        textAlign: 'center',
        color: '#FF3232',
    },
    title: { 
        marginBottom: 5, 
        color: '#fff',
        fontWeight: 'bold',
    },
    uinfo: {
        fontSize: 20,
        color: '#fff',  
        fontFamily: 'Chalkboard SE',
    },
    shadow: {
        shadowColor: '#254D3C',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    modalChildren: {
        height: 450,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
});