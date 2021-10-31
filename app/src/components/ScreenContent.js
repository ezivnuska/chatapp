import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const ScreenContent = ({ children, padded = false }) => {
    return (
        <View style={[{ paddingHorizontal: padded ? 15 : 0 }, styles.container]}>
            {children}
        </View>
    )
}

export default ScreenContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        paddingVertical: 15,
        width: '100%',
        // paddingHorizontal: 15,
    },
})