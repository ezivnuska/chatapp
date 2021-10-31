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
  ProfileScreen
} from '../screens'
// import { HeaderAddButton, HeaderBackButton } from '../components/presentations'
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

export default () => {
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
              headerTitle: 'Dashboard',
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
        name='Tabs'
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Locations'
        component={LocationStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Vendors' component={VendorStackNavigator} />
      <Stack.Screen name='Drivers' component={DriverStackNavigator} /> */}
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        // options={({ navigation, route }) => ({
        //   headerTitle: 'Profile',
        //   headerLeft: props => (
        //       <MaterialIcons
        //           style={{ paddingLeft: 5, color: '#0E4375' }}
        //           onPress={navigation.goBack}
        //           name='keyboard-arrow-left'
        //           size={35}
        //       />
        //   )
        // })}
    />
    </Stack.Navigator>
  )
}