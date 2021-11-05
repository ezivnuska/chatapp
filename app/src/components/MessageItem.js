import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const MessageItem = ({ item }) => {
    const { userId, username, body, date } = item
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => viewUser(userId)}
            >
                <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>
            <Text style={styles.body}>{body}</Text>
        </View>
    )
}

export default MessageItem

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
    },
    username: {
        fontSize: 15,
        fontWeight: 600,
        color: 'blue',
    },
    body: {

    },
})