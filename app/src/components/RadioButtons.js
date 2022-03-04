import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { FlexContainer } from '.'

const RadioButtons = ({ name, selected, options, update }) => {
    const value = useState(selected)

    const onChange = event => {
        console.log('changed', name, event.target.value)
        update(name, event.target.value)
    }

    const renderOptions = () => (
        options.map(option => (
            <View style={styles.option} key={option}>
                <input
                    type='radio'
                    value={option}
                    name={name}
                    onChange={onChange}
                    checked={option === selected}
                    // style={styles.optionInput}
                />
                <Text style={styles.optionLabel}>{option}</Text>
            </View>
        ))
    )

    return (
        <View style={styles.container}>
            {renderOptions()}
        </View>
    )
}

export default RadioButtons

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '0.75rem',
        marginBottom: '1rem',
        marginRight: '1rem',
    },
    option: {
        flex: '1 0 auto',
        display: 'flex',
        flexDirection: 'row',
    },
    optionLabel: {
        flex: '1 0 auto',
    },
    optionInput: {
        flexShrink: 1,
    },
})