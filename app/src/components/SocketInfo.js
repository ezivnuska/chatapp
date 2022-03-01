import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import globalStore from '../../GlobalStore.js'
import { StyledView } from './'

const SocketInfo = ({ socket = null }) => {
    const { username } = globalStore.user
    
    return (
        <StyledView>
            <View>
                <Text>{username}</Text>
                <Text>Socket: {socket ? socket.id : 'no socket'}</Text>
                {socket && (
                    <Text>connected: {socket.connected ? 'true' : 'false'}</Text>

                )}
            </View>
        </StyledView>
    )
}

export default SocketInfo

const styles = StyleSheet.create({

})