import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import globalStore from '../../GlobalStore'

const UserDetails = ({ user }) => (
    <View style={styles.container}>
        <Text style={[styles.text, styles.name]}>{user.username}</Text>
        <Text style={[styles.text, styles.email]}>{user.email}</Text>
    </View>
)

export default UserDetails

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    text: {
        fontSize: 20,
    },
    name: {
        fontWeight: '600',
        marginBottom: 5,
    },
    email: {
        fontSize: 18,
    },
})