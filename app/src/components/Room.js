import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import globalStore from '../../GlobalStore.js'
import { StyledView } from './'

const Room = ({ join, room }) => {

    const handlePress = () => {
        console.log('pressed to connect', room)
        if (isUserRoom()) return
        console.log('not users room, joining...')
        join(room._id)
    }

    const isUserRoom = () => globalStore.user._id === room.userId

    return (
        <StyledView>
            <TouchableOpacity
                style={styles.content}
                onPress={handlePress}
            >
                <Text>{room.username}</Text>
            </TouchableOpacity>
        </StyledView>
    )
}

export default Room

const styles = StyleSheet.create({
    content: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
    }
}) 