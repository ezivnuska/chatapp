import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SigninScreen,
    SignupScreen,
} from '../screens'
// import { MaterialIcons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Signin'
            screenOptions={{
                headerShown: false,
                headerMode: 'float'
            }}
        >
            <Stack.Screen
                name='Signin'
                component={SigninScreen}
            />
            <Stack.Screen
                name='Signup'
                component={SignupScreen}
                // options={({ navigation, route }) => ({
                //   headerLeft: props => (
                //     <MaterialIcons
                //       style={{ paddingLeft: 5, color: '#0E4375' }}
                //       onPress={navigation.popToTop}
                //       name='keyboard-arrow-left'
                //       size={35}
                //     />
                //   )
                // })}
            />
        </Stack.Navigator>
    )
}
export default AuthStackNavigator