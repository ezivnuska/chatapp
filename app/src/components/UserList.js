import React, { useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import { UserDetails } from '.'
// import { observer } from 'mobx-react'
import { MaterialIcons } from '@expo/vector-icons'
import globalStore from '../../GlobalStore'
// import axios from 'axios'
// import { action } from 'mobx'

const UserList = ({ users, setDetails }) => {
  
  const viewUser = id => {
    const user = users.filter(user => user._id === id)[0]
    setDetails(id)
    // props.navigation.navigate('UserDetails')
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => {
          console.log('username:', item.username)
          return (
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => viewUser(item._id)}
            >
              <View style={styles.userDetails}>
                <Text style={styles.username}>{item.username}</Text>
              </View>
              <View style={styles.right}>
                  <MaterialIcons
                    name='keyboard-arrow-right'
                    size={30}
                  />
                </View>
            </TouchableOpacity>
          )
        }} 
      />
    </View>
  )
}

export default UserList

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
  },
  username: {
    marginTop: 3,
    fontSize: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    // borderStyle: 'solid',
    // borderBottomWidth: 1,
    // borderBottomColor: '#aaa',
  },
  driverDetails: {
    flexGrow: 2,
    // marginBottom: 10,
    justifyContent: 'space-between',
  },
  right: {
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})