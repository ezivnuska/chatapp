import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'
import { UserDetails, UserList } from '../components'
import { observer } from 'mobx-react'
import { MaterialIcons } from '@expo/vector-icons'
import globalStore from '../../GlobalStore'
import axios from 'axios'
import { action } from 'mobx'

const UserListScreen = observer(({ navigation, route }) => {
  
  const [ users, setUsers ] = useState(route.params.store.users)
  const [ loaded, setLoaded ] = useState(false)
  const [ loading, setLoading ] = useState(false)


  const loadUsers = async () => {
    axios
    .get('http://localhost:3000/users')
    .then(action(({ data }) => {
      // console.log('users', data.users)
      route.params.store.updateUsers(data.users)
      setUsers(data.users)
      setLoaded(true)
      setLoading(false)
    }))
    .catch(err => console.log('Error', err))
  }
  
  const setDetails = id => {
    const user = users.filter(user => user._id === id)[0]
    route.params.store.setUserDetails(user)
  }
  
  useEffect(() => {
    console.log('effect: loading/loaded', loading, loaded, users.length)
    if (loading) return
    if (!loaded) {
      setLoading(true)
      loadUsers()
    }
  })
  
  return users ? (
    <View style={styles.container}>
      <UserList
        users={users}
        setDetails={setDetails}
        style={styles.userList}
      />
      {route.params.store.userDetails && (
        <UserDetails
          user={route.params.store.userDetails}
          style={styles.userDetails}
        />
      )}
    </View>
  ) : (
    <ActivityIndicator />
  )
})

export default UserListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  userList: {
    flex: 1,
  },
  userDetails: {
    flex: 2,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
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