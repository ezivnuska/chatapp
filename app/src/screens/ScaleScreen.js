import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    StyledView,
} from '../components'

const BoxWithOptions = props => {

    return (
        <View style={styles.box}>
            {props.children}
        </View>
    )
}

const ScaleScreen = props => {
    useEffect(() => {

    }, [])

    return (
        <StyledView>
            <BoxWithOptions>
                <Text>This is a Box With Options.</Text>
            </BoxWithOptions>
        </StyledView>
    )
}

export default ScaleScreen

const styles = StyleSheet.create({
    box: {
        
    },
})