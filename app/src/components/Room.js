import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import globalStore from '../../GlobalStore.js'
import { StyledView } from './'

const Room = ({ deleteRoom, joinRoom, room }) => {
    console.log('room', room)
    const handleJoin = () => {
        console.log('pressed to join', room.username)
        if (isUserRoom()) return
        console.log('not users room, joining...')
        joinRoom(room.socketId)
    }

    const handleLeave =() => {
        console.log('pressed to delete', room.socketId)
        deleteRoom(room.socketId)
    }
    
    const handleDelete =() => {
        console.log('pressed to delete', room.socketId)
        deleteRoom(room.socketId)
    }

    const isUserRoom = () => globalStore.user.username === room.username
    const isConnectedUser = () => globalStore.user._id === room.connectedUserId
    const isRoomOccupied = () => room.connectedUserId != null
    return (
        <StyledView>
            <View
                style={styles.content}
            >
                <Text>{room.username}</Text>
                <Text>{room.socketId}</Text>
                {/* <Text>socketId: {room.socketId}</Text>
                <Text>userId: {room.userId}</Text>
                <Text>room occupied: {isRoomOccupied() ? 'True' : 'False'}</Text>
                {room.connectedUserId && <Text>ConnectedUserId: {room.connectedUserId}</Text>} */}
            </View>

            {(!isConnectedUser() && !isRoomOccupied()) ? (
                <TouchableOpacity
                    style={styles.content}
                    onPress={handleJoin}
                >
                    <Text>Join</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.content}
                    onPress={handleLeave}
                >
                    <Text>Leave</Text>
                </TouchableOpacity>
            )}

            {isUserRoom() && (
                <TouchableOpacity
                    style={styles.content}
                    onPress={handleDelete}
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
            )}

            
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