import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { StyledView } from './'

const MessageItem = ({ item, deleteMessage }) => {
    const { _id, userId, username, body, date } = item
    return (
        <StyledView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => viewUser(userId)}
                >
                    <Text style={styles.username}>{username}</Text>
                </TouchableOpacity>
                <Text style={styles.body}>{body}</Text>
                <TouchableOpacity
                    onPress={() => deleteMessage(_id)}
                    style={styles.button}
                >
                    <Text>delete</Text>
                </TouchableOpacity>
            </View>
        </StyledView>
    )
}

export default MessageItem

const styles = StyleSheet.create({
    container: {
    },
    username: {
        fontSize: 15,
        fontWeight: 600,
        color: 'blue',
    },
    body: {

    },
    button: {
        margin: 5,
    }
})