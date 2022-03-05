import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    FlexChild,
    RadioButtons,
} from '.'
// import { TextInput } from 'react-native-gesture-handler'
const { height } = Dimensions.get('window')

const FlexParent = props => {

    const [flexDirection, setFlexDirection] = useState('row')// row | row-reverse | column | column-reverse
    const [flexWrap, setFlexWrap] = useState('wrap')// nowrap | wrap | wrap-reverse
    // const flexFlow = () => flexDirection + ' ' + flexWrap
    const [justifyContent, setJustifyContent] = useState('flex-start')// flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe
    const [alignItems, setAlignItems] = useState('flex-start')// stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe
    const [alignContent, setAlignContent] = useState('flex-start')// flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe
    const [gap, setGap] = useState(10)
    const [rowGap, setRowGap] = useState(10)
    const [columnGap, setColumnGap] = useState(10)
    
    // flex container options

    const options = {
        flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
        flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
        justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'start', 'end', 'left', 'right'],
        alignItems: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline', 'first baseline', 'last baseline', 'start', 'end', 'self-start', 'self-end'],
        alignContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch', 'start', 'end', 'baseline', 'first baseline', 'last baseline'],
        alignSelf: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    }

    // instantiate item array and set initial flex-basis

    const items = ['item 1', 'item 2', 'item 3', 'Zachary']

    const updateForm = (name, value) => {
        // console.log('name', name)
        // console.log('value', value)
        switch(name) {
            case 'flex-direction':
                setFlexDirection(value)
                break
            case 'flex-wrap':
                setFlexWrap(value)
                break
            case 'justify-content':
                setJustifyContent(value)
                break
            case 'align-items':
                setAlignItems(value)
                break
            case 'align-content':
                setAlignContent(value)
                break
        }
    }

    const flexItems = () => items.map((item, i) => <FlexChild key={i} />)

    return (
        <View style={styles.container}>
            
            <View style={styles.status}>
                <Text style={styles.statusText}>flex-direction: {flexDirection}</Text>
                <Text style={styles.statusText}>flex-wrap: {flexWrap}</Text>
                <Text style={styles.statusText}>justify-content: {justifyContent}</Text>
                <Text style={styles.statusText}>align-items: {alignItems}</Text>
                <Text style={styles.statusText}>align-content: {alignContent}</Text>
            </View>

            <View style={styles.columns}>
                
                <View style={styles.firstColumn}>
                    <View style={[
                        {
                            flexDirection,
                            flexWrap,
                            justifyContent,
                            alignItems,
                            alignContent,
                            gap,
                            rowGap,
                            columnGap,
                        },
                        styles.display,
                    ]}>
                        {items.map((item, i) => <FlexChild key={i} />)}
                    </View>
                </View>

                <View style={styles.secondColumn}>

                    <View style={styles.controls}>

                        <View>
                            <Text style={styles.controlLabel}>flex-direction</Text>
                            <RadioButtons
                                name='flex-direction'
                                selected={flexDirection}
                                options={options.flexDirection}
                                update={updateForm}
                            />
                        </View>
                        <View>
                            <Text style={styles.controlLabel}>flex-wrap</Text>
                            <RadioButtons
                                name='flex-wrap'
                                selected={flexWrap}
                                options={options.flexWrap}
                                update={updateForm}
                            />
                        </View>
                        <View>
                            <Text style={styles.controlLabel}>justify-content</Text>
                            <RadioButtons
                                name='justify-content'
                                selected={justifyContent}
                                options={options.justifyContent}
                                update={updateForm}
                            />
                        </View>
                        <View>
                            <Text style={styles.controlLabel}>align-content</Text>
                            <RadioButtons
                                name='align-content'
                                selected={alignContent}
                                options={options.alignContent}
                                update={updateForm}
                            />
                        </View>
                        <View>
                            <Text style={styles.controlLabel}>align-items</Text>
                            <RadioButtons
                                name='align-items'
                                selected={alignItems}
                                options={options.alignItems}
                                update={updateForm}
                            />
                        </View>
                    </View>
                </View> 

            </View>
        </View>
    )
}

export default FlexParent

const styles = StyleSheet.create({
    container: {
        //height - 50,
        backgroundColor: '#222',
        padding: '0.5rem',
    },
    columns: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        gap: '0.5rem',
    },
    firstColumn: {
        flexGrow: 3,
        flexShrink: 0,
        flexBasis: 'auto',
        // alignSelf: 'stretch',
    },
    display: {
        display: 'flex',
        borderWidth: 1,
        borderColor: '#f00',
        borderStyle: 'dotted',
        backgroundColor: '#fdd',
        padding: '0.5rem',
        // height: 500,
        overflow: 'auto',
        maxHeight: '700px',
    },
    secondColumn: {
        flex: '1 0 auto',
        alignSelf: 'stretch',
    },
    status: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        // alignItems: 'flex-start',
        backgroundColor: '#000',
    },
    statusText: {
        flex: '1 0 auto',
        // padding: '0.5rem',
        fontWeight: 700,
        lineHeight: 30,
        height: 37,
        color: '#fff',
        textAlign: 'center',
    },
    controls: {
        flex: '1 0 auto',
        display: 'flex',
        flexFlow: 'column wrap',
        height: 500,
        padding: '0.5rem',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: '#f00',
        backgroundColor: '#fff',
    },
    controlLabel: {
        fontWeight: 700,
        lineHeight: 30,
        height: 20,
        marginBottom: '0.5rem',
    },
})