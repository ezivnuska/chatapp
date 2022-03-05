import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native'
import {
    FlexParent,
} from '../components'

const { height } = Dimensions.get('window')

const FlexScreen = () => (
    <View style={styles.container}>
        <FlexParent />
    </View>
)

export default FlexScreen

const styles = StyleSheet.create({
    container: {
        height,
    },
})