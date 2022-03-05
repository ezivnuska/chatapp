import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    RadioButtons,
} from '.'
import { TextInput } from 'react-native-gesture-handler'

const FlexChildStyleForm = ({ flexGrow, flexShrink, flexBasis, alignSelf, setFlexGrow, setFlexShrink, setFlexBasis, setAlignSelf }) => {
    const options = {
        alignSelf: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    }

    useEffect(() => {
        console.log('form render')
        return () => console.log('form unmounting...')
    }, [flexGrow, flexShrink, flexBasis, alignSelf])

    const changeStyle = (name, value) => {
        switch(name) {
            case 'flex-grow':
                console.log('change flex-grow', value)
                setFlexGrow(value)
                break
            case 'flex-shrink':
                console.log('change flex-shrink', value)
                setFlexShrink(value)
                break
            case 'flex-basis':
                console.log('change flex-basis', value)
                setFlexBasis(value)
                break
            case 'align-self':
                console.log('change align-self', value)
                setAlignSelf(value)
                break
        }
    }

    return (
        <View style={styles.itemStyles}>

            <View style={styles.styleStatus}>
                <Text>flex-grow: {flexGrow}</Text>
                <Text>flex-shrink: {flexShrink}</Text>
                <Text>flex-basis: {flexBasis}</Text>
                <Text>align-self: {alignSelf}</Text>
            </View>
            
            <View style={styles.styleControls}>
                
                <View style={styles.textInputContainer}>
                    <Text style={styles.textInputLabel}>flex-grow</Text>
                    <TextInput
                        // initialValue={flexStyles.flexGrow}
                        style={styles.textInput}
                        // onBlur={onBlur}
                        onChangeText={value => changeStyle('flex-grow', value)}
                        value={flexGrow}
                        placeholder=''
                        textContentType='none'
                        autoCapitalize='none'
                        keyboardType='numeric'
                    />
                </View>
                
                <View style={styles.textInputContainer}>
                    <Text style={styles.textInputLabel}>flex-shrink</Text>
                    <TextInput
                        // initialValue={flexStyles.flexShrink}
                        style={styles.textInput}
                        // onBlur={onBlur}
                        onChangeText={value => changeStyle('flex-shrink', value)}
                        value={flexShrink}
                        placeholder=''
                        textContentType='none'
                        autoCapitalize='none'
                        keyboardType='numeric'
                    />
                </View>
                
                <View style={styles.textInputContainer}>
                    <Text style={styles.textInputLabel}>flex-basis</Text>
                    <TextInput
                        // initialValue={flexStyles.flexBasis}
                        style={styles.textInput}
                        onChangeText={value => changeStyle('flex-basis', value)}
                        value={flexBasis}
                        placeholder=''
                        textContentType='none'
                        autoCapitalize='none'
                        keyboardType='numeric'
                    />
                </View>
                
                <View>
                    <Text>align-self</Text>
                    <RadioButtons
                        // name='align-self'
                        selected={alignSelf}
                        options={options.alignSelf}
                        update={(name, value) => changeStyle('align-self', value)}
                    />
                </View>
            </View>
        </View>
    )
}

export default FlexChildStyleForm

const styles = StyleSheet.create({
    itemStyles: {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'flex-start',
        alignItems: 'space-between',
    },
    styleStatus: {
        flex: '1 0 auto',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f00',
    },
    styleControls: {
        flex: '1 0 auto',
        padding: '0.5rem',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f00',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
    },
    textInputContainer: {
        flex: '0 0 auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        paddingHorizontal: '0.5rem',
        paddingBottom: '1rem',
        marginBottom: '0.5rem',
        textAlign: 'left',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: '#00f',
        height: '30px',
    },
    textInputLabel: {
        flex: '0 0 auto',
        paddingRight: 10,
        lineHeight: 30,
        height: 30,
    },
    textInput: {
        flex: '0 0 auto',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        lineHeight: 30,
        width: 50,
        height: 30,
        alignItems: 'stretch',
    },
})