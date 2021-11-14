import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

const StyledView = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
)

export default StyledView

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
})