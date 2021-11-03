import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { enableScreens } from 'react-native-screens'

import { AuthLoadingScreen } from './screens'

import {
    AppNavigator,
    AuthStackNavigator,
} from './navigators'

enableScreens()

const Stack = createNativeStackNavigator()

const ChatApp = () => (
    <NavigationContainer
        // onStateChange={(state) => console.log('New state is', state)}
    >
        <Stack.Navigator
            initialRouteName = 'AuthLoading'
            screenOptions={{
                headerShown: false,
                headerLargeTitle: true,
            }}
        >
            <Stack.Screen
                name='AuthLoading'
                component={AuthLoadingScreen}
            />
            <Stack.Screen
                name='Auth'
                component={AuthStackNavigator}
            />
            <Stack.Screen
                name='App'
                component={AppNavigator}

            />
        </Stack.Navigator>
    </NavigationContainer>
)

export default ChatApp