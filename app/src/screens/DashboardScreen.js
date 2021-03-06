import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import SecureScreen from './SecureScreen'
import {
    ChatModule,
    RoomList
} from '../components'
import { MaterialIcons } from '@expo/vector-icons'

const { height } = Dimensions.get('window')

const DashboardScreen = props => {
    const [ loadClient, setLoadClient ] = useState(true)

    const navigateToUserList = () => props.navigation.navigate('Users')
    const navigateToChat = () => props.navigation.navigate('Chat')
    const navigateToFlex = () => props.navigation.navigate('Flex')

    return (
        <View style={styles.container}>

            <TouchableOpacity
              style={styles.rowContainer}
              onPress={navigateToUserList}
            >
                <Text style={styles.link}>
                    Users
                </Text>
                <View style={styles.right}>
                    <MaterialIcons
                        name='keyboard-arrow-right'
                        size={30}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={navigateToChat}
            >
                <Text style={styles.link}>
                    Chat
                </Text>
                <View style={styles.right}>
                    <MaterialIcons
                        name='keyboard-arrow-right'
                        size={30}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={navigateToFlex}
            >
                <Text style={styles.link}>
                    Flex
                </Text>
                <View style={styles.right}>
                    <MaterialIcons
                        name='keyboard-arrow-right'
                        size={30}
                    />
                </View>
            </TouchableOpacity>
            {/* <RoomList />
            <ChatModule /> */}

        </View>
    )
}

export default SecureScreen(DashboardScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: height,
    },
    link: {
        fontSize: 20,
        marginTop: 3,
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // marginBottom: 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      // borderStyle: 'solid',
      // borderBottomWidth: 1,
      // borderBottomColor: '#aaa',
    },
})