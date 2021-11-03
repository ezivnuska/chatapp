import React, { useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    // Text,
    View,
} from 'react-native'
import { observer } from 'mobx-react'
import { UserDetails } from '../components'

const { height } = Dimensions.get('window')

const UserDetailsScreen = observer(({ navigation, route }) => (
    <View style={styles.container}>
        <UserDetails user={route.params.store.details}/>
    </View>
))

export default UserDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
    },
})