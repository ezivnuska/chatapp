import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
} from '../components'
import { MaterialIcons } from '@expo/vector-icons'

const { height } = Dimensions.get('window')

const FlexScreen = props => (
    <View style={styles.container}>

    </View>
)

export default FlexScreen

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