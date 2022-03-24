import React, { useEffect, useRef, useState } from 'react'
import {
    ActivityIndicator,
    Animated,
    Easing,
    Text,
    View,
    StyleSheet,
} from 'react-native'

const Timer = ({ id, killTimer }) => {
    
    const [mounted, setMounted] = useState(false)
    const [seconds, setSeconds] = useState(0)
    let interval
    let loadAnimation = useRef(new Animated.Value(0)).current
    let fadeOutAnimation = useRef(new Animated.Value(1)).current
    
    const updateInterval = e => {
        setSeconds(seconds => seconds + 1)
    }

    useEffect(() => {
        setMounted(true)
        console.log('timer ' + id + ' mounted')
        
        return () => {
            clearTimeout(interval)
            setMounted(false)
            console.log('timer ' + id + ' unmounting...')
        }
    }, [])
    
    useEffect(() => {
        Animated.sequence([
            Animated.timing(loadAnimation,
            {
                toValue: 100,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: false
            }),
            Animated.timing(fadeOutAnimation,
            {
                toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false
            })
        ]).start(() => killTimer(id))
        interval = setInterval(updateInterval, 1000)
    }, [loadAnimation])

    useEffect(() => {
        if (seconds >= 3) {
            clearInterval(interval)
            interval = undefined
            
            if (mounted) {
                console.log('not mounted. ejecting!')
                setSeconds(0)
            }
        }
    }, [seconds])
    
    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.loader,
                {
                    width: loadAnimation.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['1%', '100%']
                    }),
                    opacity: fadeOutAnimation,
                }]} />
            <Text style={styles.text}>{id}</Text>
        </View>
    )
}

export default Timer

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderWidth: 1,
        borderColor: '#000',
        borderStyle:'solid',
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 30,
        width: 0,
        backgroundColor: '#f00',
        zIndex: 100,
        opacity: 1,
    },
    text: {
        // position: 'relative',
        // top: 0,
        // left: 0,
        fontSize: 24,
        lineHeight: 30,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle:'solid',
        zIndex: 20,
        width: '100%',
        textAlign: 'center',
    },
})