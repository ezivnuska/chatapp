import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersNavigator from './UsersNavigator'
// import BottomTabNavigator from './BottomTabNavigator'
// import DriverStackNavigator from './DriverStackNavigator'
// import LocationStackNavigator from './LocationStackNavigator'
// import VendorStackNavigator from './VendorStackNavigator'
import {
  CanvasScreen,
  ChatScreen,
  DashboardScreen,
  ExampleScreen,
  FlexScreen,
  // HomeScreen,
  // MapScreen,
  ScaleScreen,
  ProfileScreen,
  UserListScreen,
  UserDetailsScreen,
} from '../screens'
import {
  SignoutButton,
} from '../components'
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Dashboard'
      // screenOptions={({ navigation, route }) => ({
      //   headerShown: true,
      //   headerTransparent: true,
      // })}
    >
      <Stack.Screen
          name='Dashboard'
          component={DashboardScreen}
          options={({ navigation, route }) => ({
              // headerTitle: 'Dashboard',
              headerRight: () => (
                  <SignoutButton navigation={navigation} />
              ),
          })}
      />
      <Stack.Screen
          name='Chat'
          component={ChatScreen}
          // options={({ navigation, route }) => ({
          //     // headerTitle: 'Dashboard',
          //     headerRight: () => (
          //         <EvilIcons
          //             style={{ paddingRight: 10, color: '#0E4375' }}
          //             onPress={() => navigation.navigate('Profile')}
          //             name='user'
          //             size={40} 
          //         />
          //     ),
          // })}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
      />
      <Stack.Screen
        name='Canvas'
        component={CanvasScreen}
      />
      <Stack.Screen
        name='Example'
        component={ExampleScreen}
      />
      <Stack.Screen
        name='Flex'
        component={FlexScreen}
      />
      <Stack.Screen
        name='Scale'
        component={ScaleScreen}
      />
      <Stack.Screen
        name='Users'
        component={UsersNavigator}
        options={({ navigation, route }) => ({
          headerTitle: 'Users',
          headerLeft: props => (
            <MaterialIcons
                style={{ paddingLeft: 5, color: '#0E4375' }}
                onPress={navigation.goBack}
                name='keyboard-arrow-left'
                size={35}
            />
          )
        })}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator