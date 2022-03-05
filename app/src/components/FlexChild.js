import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    FlexChildStyleForm,
} from '.'

const FlexChild = () => {

    const initialItemStyles = {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
    }

    const [flexGrow, setFlexGrow] = useState(initialItemStyles.flexGrow)
    const [flexShrink, setFlexShrink] = useState(initialItemStyles.flexShrink)
    const [flexBasis, setFlexBasis] = useState(initialItemStyles.flexBasis)
    const [alignSelf, setAlignSelf] = useState(initialItemStyles.alignSelf)
    // const flex = flexGrow + ' ' + flexShrink + ' ' + flexBasis

    useEffect(() => {
        return () => console.log('child unmounting...')
    }, [flexGrow, flexShrink, flexBasis, alignSelf])

    return (
        <View
            style={[
                styles.container,
                {
                    flexGrow,
                    flexShrink,
                    flexBasis,
                    alignSelf,
                }
            ]}
        >
            <FlexChildStyleForm
                flexGrow={flexGrow}
                flexShrink={flexShrink}
                flexBasis={flexBasis}
                alignSelf={alignSelf}
                setFlexGrow={setFlexGrow}
                setFlexShrink={setFlexShrink}
                setFlexBasis={setFlexBasis}
                setAlignSelf={setAlignSelf}
            />
        </View>
    )
}

export default FlexChild

const styles = StyleSheet.create({
    container: {
        padding: '0.25rem',
        backgroundColor: '#eee',
    },
})