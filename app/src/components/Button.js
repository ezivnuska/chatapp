import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

const Button = ({ label, onPress, ...props }) => (
    <TouchableOpacity
        style={[props.style, styles.button]}
        onPress={onPress}
    >
        <Text
        style={styles.buttonLabel}
        accessibilityLabel={label}>
            {label}
        </Text>
    </TouchableOpacity>
)

export default Button

const styles = StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: '#aff',
        borderRadius: 10,
        shadowColor: '#2F1A0C',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        marginVertical: 10,
    },
    buttonLabel: {
        color: '#000',
        fontSize: 20,
        marginTop: 7,
        textAlign: 'center',
        paddingHorizontal: '1rem',
    },
})