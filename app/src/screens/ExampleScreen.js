import React, { useEffect, useState } from 'react'

import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import {
    Button,
    Timer,
} from '../components'

const Item = ({ text }) => (
    <View style={styles.item}>
        <Text style={styles.text}>{text}</Text>
    </View>
)

let numberOfTimers = 0

const ExampleScreen = () => {

    const [mounted, setMounted] = useState(false)
    const [actions, setActions] = useState([])
    // const [flag, setFlag] = useState(false)
    // const [newAction, setNewAction] = useState(null)

    // const addAction = action => {
    //     const currentActions = actions
    //     console.log('adding action')
    //     console.log('current actions', currentActions)
    //     const newAction = {
    //         id: actions.length,
    //         text: action,
    //     }
    //     actions.push(newAction)
    //     // setNewAction(newAction)
    //     console.log('*', actions)
    //     setFlag(true)
    // }

    const addNewAction = text => {
        const id = actions.length + 1
        console.log('new action id', id)
        const action = {
            id,
            text,
        }
        setActions([...actions, action])
    }
    
    useEffect(() => {
        setMounted(true)

        // constructor stuff...

        addNewAction('mounted')
        return () => {
            setMounted(false)
            console.log('unmounting...')
        }
    }, [])
    
    useEffect(() => {
        console.log('actions', actions.map(a => a.text))
    }, [actions])

    const onButtonPressed = e => {
        addNewAction('button pressed')
    }

    const clearActions = () => {
        setActions([{ id: 0, text: 'actions cleared' }])
    }

    const renderItem = ({ item }) => <Item text={item.text} />
    const [timers, setTimers] = useState([])
    // const [flag, setFlag] = useState(false)
    
    const addTimer = () => {
        numberOfTimers++
        const newTimer = {
            id: numberOfTimers,
            active: true,
        }
        setTimers([
            ...timers,
            newTimer,
        ])
        addNewAction('timer ' + numberOfTimers + ' added')
    }

    const killTimer = id => {
        console.log('killing id:', id)
        const adjusted = timers.map(timer => {
            if (timer.id === id) timer.active = false
            return timer
        })

        setTimers(adjusted)
        addNewAction(`timer ${id} killed`)
    }

    useEffect(() => {
        console.log('timers changed: ', timers)
        console.log('timers IDs: ', timers.map(t => t.id))

    }, [timers])

    const getActiveTimerIds = () => {
        console.log('timers........', timers)
        return timers.filter(t => t.active === true).map(t => t.id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.controls}>
                    <Button
                        style={styles.button}
                        label='Click me!'
                        onPress={onButtonPressed}
                    />
                    <Button
                        style={styles.button}
                        label='Clear actions'
                        onPress={clearActions}
                    />
                    <Button
                        style={styles.button}
                        label='Add timer'
                        onPress={addTimer}
                    />
                </View>
                {mounted && getActiveTimerIds().length ? (
                    <View
                        style={styles.timers}
                        children={getActiveTimerIds().map(timer => (
                            <View key={timer.id} style={styles.timer}>
                                <Timer id={timer.id} killTimer={killTimer} />
                            </View>
                        ))}
                    />
                ) : null}
            </View>
            <View style={styles.aside}>
                <FlatList
                    data={actions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default ExampleScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexFlow: 'row nowrap',
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        minHeight: 200,
    },
    main: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'dotted',
    },
    controls: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end',
        alignItems: 'space-between',
        gap: 10,
    },
    button: {
        flex: '0 1 auto',
        maxWidth: 200,
    },
    aside: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'dotted',
    },
    item: {
        borderWidth: 1,
        borderColor: '#f00',
        borderStyle: 'solid',
    },
    text: {
        fontSize: 32,
        textAlign: 'center',
    },
    timers: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexDirection: 'column',
        alignContent: 'space-between',
        borderWidth: 1,
        borderColor: '#000',
        borderStyle:'solid',
        height: 40,
    },
    timer: {
        flex: 1,
        alignSelf: 'center',
        minWidth: 150,
        width: 0,
    }
})