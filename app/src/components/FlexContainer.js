import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const FlexContainer = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
)

export default FlexContainer

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderColor: 'red',
        background: 'yellow',
    },
})