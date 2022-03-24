import React, { useEffect } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native'
import {
    ArtBoard,
} from '../components'

const { height } = Dimensions.get('window')

const CanvasScreen = () => {

    useEffect(() => {
        // console.log('height', height)
        return () => console.log('CanvasScreen unmounting...')
    }, [])

    return (
        <View style={styles.container}>
            <ArtBoard />
        </View>
    )
}

export default CanvasScreen

const styles = StyleSheet.create({
    container: {
        height,
    },
})