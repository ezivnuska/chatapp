import React from 'react'
import { 
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { ScreenContent } from '../components'
import axios from 'axios'
import globalStore from '../../GlobalStore'
import { action } from 'mobx'
import { useForm, Controller } from 'react-hook-form'


const SignInScreen = props => {

  const navigateToSignup = () => props.navigation.navigate('Signup')
  const navigateToSendEmail = () => props.navigation.navigate('SendEmail')
  
  // signIn = (e) => {
  //   e.preventDefault();

  //   if (!this.state.email || !this.state.password) {
  //     alert('Email and password are required');
  //     return;
  //   }

  //   const user = {
  //     email: this.state.email,
  //     password: this.state.password,
  //   };

  //   axios
  //     .post('http://192.168.1.66:5000/signin', user)
  //     .then(result => {
  //         if (result.data.success) {
  //           const user = Object.assign({}, result.data.user);
            
  //           AsyncStorage
  //               .setItem('userToken', user._id)
  //               .then(res => {
  //                   globalStore.updateUser(user);
  //                   this.props.navigation.navigate('App');
  //               })
  //               .catch(err => alert('Signin Error!'));
  //         } else {
  //           alert('Error happens when try to sign you in! Please check email and password!');
  //         }    
  //     })
  //     .catch(err => {
  //       alert('Failed to sign you in! If you do not have an account, sign up first!');
  //       console.log(err);
  //     });
  // }

  const { control, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = values => {
    const { email, password } = values
    if (!email || !password) {
      alert('Email and password are required')
      return
    }

    const user = {
      email,
      password,
    }
    console.log('signing in with user', user)
    axios
      .post('http://localhost:3000/signin', user)
      .then(({ data }) => {
        console.log('signin response', data)
        if (data.success) {
          const user = Object.assign({}, data.user)
          console.log('user signed in', user)
          AsyncStorage
            .setItem('userToken', user._id)
            .then(action(() => {
              console.log('userToken saved in local storage')
              globalStore.updateUser(user)
              props.navigation.navigate('App', { routeName: 'Home' })
            }))
            .catch(err => alert('Signin Error!'))

        } else {
          alert('Signin failed.')
        }    
      })
      .catch(err => {
        alert('Error signing in')
        console.log('Failed sign in.', err)
      })
  }
  
  return (
    <ScreenContent padded>
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <Text style={styles.header}>Chat App</Text>

        <View style={styles.divider_bar}></View>

        <View style={styles.content}>
          <Text>Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value }}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Email'
                textContentType='emailAddress'
                autoCapitalize='none'
                keyboardType='email-address'
              />
            )}
            name='email'
            defaultValue=''
          />
          <Text>Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value }}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Password'
                textContentType='password'
                secureTextEntry={true}
              />
            )}
            name='password'
            defaultValue=''
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              style={styles.buttonLabel}
              accessibilityLabel='Sign In'>
              Sign In
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomLinks}>
            <Text
              style={styles.link}
              onPress={navigateToSignup}
            >
              Sign Up
            </Text>

            <Text
              style={styles.link}
              onPress={navigateToSendEmail}
            >
              Forgot password?
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContent>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    // width: 350,
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  content: {
    height: 300,
  },
  header: {
    fontSize: 40, 
    color: '#0E4375',
    shadowColor: '#092E51',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    textAlign: 'center',
  },
  divider_bar: {
    // width: 350,
    backgroundColor: '#FAD9C5',
    height: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  form: {
    flexShrink: 0,
    // flex: 1,
    flexDirection: 'column',
    // width: 350,
    // height: 250,
    // alignItems: 'center', 
    justifyContent: 'flex-start',
    // borderWidth: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fields: {
    marginTop: 15,
  },
  row: {
    paddingBottom: 15,
    // paddingHorizontal: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    padding: 5,
  },
  input: {
      height: 40,
      color: '#000',
      paddingHorizontal: 10,
      fontSize: 18,
      lineHeight: 23,
      backgroundColor: '#eee',
      borderWidth: 1,
      borderColor: '#ccc',
  },
  rootError: {
    color: 'red',
  },
  admin: {
    // flexDirection: 'row',
    // paddingHorizontal: 10,
  },
  button: {
    // flex: 1,
    height: 40,
    backgroundColor: '#F08E52',
    borderRadius: 10,
    shadowColor: '#2F1A0C',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginVertical: 10,
    // marginHorizontal: 5,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 20,
    marginTop: 7,
    textAlign: 'center',
  },
  activity: {
    marginTop: 20,
  },
  bottomLinks: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginHorizontal: 'auto',
  },
  link: {
    // flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    // textAlign: 'center',
    marginBottom: 15,
    // borderWidth: 1,
    color: '#00f',
  },
})