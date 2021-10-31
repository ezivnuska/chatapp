import React from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native'

const { height } = Dimensions.get('window')

const DashboardScreen = () => (
    <View style={styles.container}>
        
    </View>
)

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
    },
})