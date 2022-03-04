import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    RadioButtons,
} from '../components'
import { TextInput } from 'react-native-gesture-handler'

const { height } = Dimensions.get('window')

const FlexScreen = props => {

    // flex container state
    
    const [flexDirection, setFlexDirection] = useState('row')// row | row-reverse | column | column-reverse
    const [flexWrap, setFlexWrap] = useState('wrap')// nowrap | wrap | wrap-reverse
    const flexFlow = flexDirection + ' ' + flexWrap
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
    
    const getFlexContainerStyles = () => ({
        flexFlow,
        justifyContent,
        alignItems,
        alignContent,
        gap,
        rowGap,
        columnGap,
        borderColor: '#f00',
        borderWidth: 1,
        borderStyle: 'dotted',
        backgroundColor: '#ccc',
    })

    // instantiate item array and set initial flex-basis

    const items = ['item 1', 'item 2', 'item 3', 'Zachary']
    const size = Math.floor(100 / items.length) + '%'
    
    // flex item state

    const [flexGrow, setFlexGrow] = useState(0)
    const [flexShrink, setFlexShrink] = useState(0)
    const [flexBasis, setFlexBasis] = useState(size)
    const [alignSelf, setAlignSelf] = useState('auto')// auto | flex-start | flex-end | center | baseline | stretch
    // const flex = flexGrow + ' ' + flexShrink + ' ' + flexBasis
    
    const initialItemStyles = items.map(item => ({
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
    }))

    const [itemStyles, setItemStyles] = useState(initialItemStyles)

    const updateItemStyleAtIndex = (index, style, value) => {
        const item = itemStyles[index]
        const newItem = {
            ...item,
            [style]: value,
        }
        console.log(index, style, value)
        console.log('item >', item)
        console.log('newItem >', newItem)
        const newStyles = itemStyles.map((style, i) => {
            if (i === index) return newItem
            else return style
        })
        console.log('newStyles', newStyles)
        setItemStyles(newStyles)
    }

    const getStyleAtIndex = (index, style) => {
        const item = itemStyles[index]
        console.log('item', item)
        return item[style]
    }
    
    const getFlexItemStylesAtIndex = index => ({
        ...itemStyles[index],
        display: 'inline-block',
        borderWidth: '1px',
        borderColor: '#000',
        borderStyle: 'dotted',
        backgroundColor: '#aaa',
    })
    
    const updateForm = (name, value) => {
        console.log('name', name)
        console.log('value', value)
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
        }
    }

    const renderItemStylesAtIndex = index => {
        const itemStyle = itemStyles[index]
        const grow = getStyleAtIndex(index, 'flexGrow')
        const shrink = getStyleAtIndex(index, 'flexShrink')
        const basis = getStyleAtIndex(index, 'flexBasis')
        console.log('grow', grow)
        console.log('shrink', shrink)
        console.log('basis', basis)
        return (
            <View style={styles.itemStyles}>
                <View style={styles.styleStatus}>
                    <Text>flex-grow: { itemStyle.flexGrow}</Text>
                    <Text>flex-shrink: { itemStyle.flexShrink}</Text>
                    <Text>flex-basis: { itemStyle.flexBasis}</Text>
                    <Text>self-align: { itemStyle.alignSelf}</Text>
                </View>
                <View style={styles.styleControls}>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>flex-grow</Text>
                        <TextInput
                            initialValue={itemStyle.flexGrow}
                            style={styles.textInput}
                            // onBlur={onBlur}
                            onChangeText={value => updateItemStyleAtIndex(index, 'flexGrow', value)}
                            value={grow}
                            placeholder=''
                            textContentType='none'
                            autoCapitalize='none'
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>flex-shrink</Text>
                        <TextInput
                            initialValue={itemStyle.flexShrink}
                            style={styles.textInput}
                            // onBlur={onBlur}
                            onChangeText={value => updateItemStyleAtIndex(index, 'flexShrink', value)}
                            value={shrink}
                            placeholder=''
                            textContentType='none'
                            autoCapitalize='none'
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>flex-basis</Text>
                        <TextInput
                            initialValue={itemStyle.flexBasis}
                            style={styles.textInput}
                            onChangeText={value => updateItemStyleAtIndex(index, 'flexBasis', value)}
                            value={basis}
                            placeholder=''
                            textContentType='none'
                            autoCapitalize='none'
                            keyboardType='numeric'
                        />
                    </View>
                    <View>
                        <Text>align-self</Text>
                        <RadioButtons
                            name={`align-self${index}`}
                            selected={getStyleAtIndex(index, 'alignSelf')}
                            options={options.alignSelf}
                            update={e => updateItemStyleAtIndex(index, 'alignSelf', e.value)}
                        />
                    </View>
                </View>
            </View>
        )    
    }

    const flexItems = () => {
        // const flexItemStyles = getFlexItemStyles()
        const flexContainerStyles = getFlexContainerStyles()
        // console.log('flexItemStyles', flexItemStyles)
        console.log('flexContainerStyles', flexContainerStyles)
        return (
            <View style={{
                ...flexContainerStyles
            }}>
                {items.map((item, i) => (
                    <View
                        key={i}
                        style={{
                            ...getFlexItemStylesAtIndex(i),
                        }}
                    >
                        <Text>{item}</Text>
                        {renderItemStylesAtIndex(i)}
                    </View>
                ))}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.firstColumn}>

                <View style={styles.status}>
                    <Text>flex-direction: {flexDirection}</Text>
                    <Text>flex-wrap: {flexWrap}</Text>
                    <Text>justify-content: {justifyContent}</Text>
                    <Text>align-items: {alignItems}</Text>
                </View>

                <View style={styles.display}>
                    {flexItems()}
                </View>

            </View>

            <View style={styles.secondColumn}>

                <View style={styles.controls}>

                    <View>
                        <Text>flex-direction</Text>
                        <RadioButtons
                            name='flex-direction'
                            selected={flexDirection}
                            options={options.flexDirection}
                            update={updateForm}
                        />
                    </View>
                    <View>
                        <Text>flex-wrap</Text>
                        <RadioButtons
                            name='flex-wrap'
                            selected={flexWrap}
                            options={options.flexWrap}
                            update={updateForm}
                        />
                    </View>
                    <View>
                        <Text>justify-content</Text>
                        <RadioButtons
                            name='justify-content'
                            selected={justifyContent}
                            options={options.justifyContent}
                            update={updateForm}
                        />
                    </View>
                    <View>
                        <Text>align-items</Text>
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
    )
}

export default FlexScreen

const styles = StyleSheet.create({
    textInputContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'space-between',
        paddingBottom: '1rem',
        textAlign: 'left',
    },
    textInputLabel: {
        flex: '0 1 30%',
        paddingRight: 10,
        lineHeight: 30,
    },
    textInput: {
        flex: '0 1 50%',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        lineHeight: 30,
        width: '50px',
        alignItems: 'stretch',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        height,
    },
    firstColumn: {
        flex: '3 0 auto',
    },
    status: {
        flex: '1 0 1',
    },
    display: {
        flex: '2 0 1',
        height: 300,
    },
    secondColumn: {
        flex: '1 0 auto',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: '#ff0',
    },
    controls: {
        display: 'flex',
        flexFlow: 'column wrap',
        height: 500,
        paddingTop: '1rem',
        paddingLeft: '1rem',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
    },
    itemStyles: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    styleStatus: {
        flex: '1 0 auto',
    },
    styleControls: {
        flex: '1 0 auto',
    }
})