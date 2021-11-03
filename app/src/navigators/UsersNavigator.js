import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BottomTabNavigator from './BottomTabNavigator'
// import DriverStackNavigator from './DriverStackNavigator'
// import LocationStackNavigator from './LocationStackNavigator'
// import VendorStackNavigator from './VendorStackNavigator'
import {
  DashboardScreen,
  // HomeScreen,
  // MapScreen,
  ProfileScreen,
  UserListScreen,
  UserDetailsScreen,
} from '../screens'
// import { HeaderAddButton, HeaderBackButton } from '../components/presentations'
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'
import globalStore from '../../GlobalStore'

const Stack = createNativeStackNavigator()

const UsersNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='UserList'
      screenOptions={({ navigation, route }) => ({
        // headerShown: false,
        // headerTransparent: false,
        // headerTitle: 'Users',
          // headerLeft: props => (
          //   <MaterialIcons
          //       style={{ paddingLeft: 5, color: '#0E4375' }}
          //       onPress={navigation.goBack}
          //       name='keyboard-arrow-left'
          //       size={35}
          //   />
          // )
      })}
    >
      <Stack.Screen
        name='UserList'
        component={UserListScreen}
        initialParams={{ store: globalStore }}
        options={({ navigation, route }) => ({
          headerShown: false,
          headerRight: () => (
            <EvilIcons
              style={{ paddingRight: 10, color: '#0E4375' }}
              onPress={() => navigation.navigate('Profile')}
              name='user'
              size={40} 
            />
          ),
        })}
      />
      {/* <Stack.Screen
        name='UserDetails'
        component={UserDetailsScreen}
        initialParams={{ store: globalStore }}
        screenOptions={({ navigation, route }) => ({
          headerShown: true,
          headerTransparent: false,
          headerTitle: 'User Details',
          headerLeft: props => (
            <MaterialIcons
                style={{ paddingLeft: 5, color: '#0E4375' }}
                onPress={navigation.goBack}
                name='keyboard-arrow-left'
                size={35}
            />
          )
        })}
      /> */}
    </Stack.Navigator>
  )
}

export default UsersNavigator