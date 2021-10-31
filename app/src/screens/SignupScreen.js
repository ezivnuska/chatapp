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
import { ScreenContent } from '../components'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'

const SignUpScreen = props => {

    const { control, handleSubmit, formState: { errors } } = useForm()

    // const verify = values => {
    //   const { email, username, password, passwordConfirm } = values
    //   console.log('values', values)
    //   if (
    //     email === ''
    //     || username === ''
    //     || password === ''
    //     || passwordConfirm === ''
    //   ) {
    //     alert('All fields are required')
    //     return false
    //   }

    //   if (password !== passwordConfirm) {
    //     alert('Passwords do not match. Please try again')
    //     return false
    //   }
    //   return true
    // }

    const onSubmit = values => {
      const { email, username, password, passwordConfirm } = values
      // if (!verify(values)) {
      //   console.log('form validation failed')
      //   return
      // }

      console.log('submitting values:', values)

      const user = {
        email: email,
        username: username,
        password: password,
      }
      console.log('user', user)
      axios
        .post('http://localhost:3000/signup', user)
        .then(result => {
          console.log('result from post request', result)
          // console.log('setSubmitting', setSubmitting)
          // setSubmitting(false)
          navigateToSignin() 
        })
        .catch(err => {
          alert('Failed to sign you up! If you already have an account, log in directly!');
          console.log('Error getting user.', err)
        })
    }

    const navigateToSignin = () => {
      console.log('navigateToSignin')
      props.navigation.navigate('Signin');
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
            <Text>Username</Text>
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
                  placeholder='Username'
                  textContentType='username'
                  autoCapitalize='none'
                />
              )}
              name='username'
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
            <Text>Confirm Password</Text>
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
                  placeholder='Confirm Password'
                  textContentType='password'
                  secureTextEntry={true}
                />
              )}
              name='passwordConfirm'
              defaultValue=''
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={styles.buttonLabel}
                accessibilityLabel='Sign Up'>
                Sign Up
              </Text>
            </TouchableOpacity>

            <View style={styles.bottomLinks}>
              <Text
                style={styles.link}
                onPress={navigateToSignin}
              >
                Sign In
              </Text>
            </View>
            {/* <Formik
              initialValues={{
                email: '',
                username: '',
                password: '',
                passwordConfirm: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                const { email, username, password, passwordConfirm } = values
                console.log('submitting values:', values)
                if (!email || !password || !passwordConfirm) {
                  alert('All fields are required');
                  return
                }
          
                if (password !== passwordConfirm) {
                  alert('Passwords do not match. Please try again');
                } else {
                  const user = {
                    email: email,
                    username: username,
                    password: password,
                  };
                  console.log('user', user)
                  axios
                    .post('http://localhost:3000/signup', user)
                    .then(result => {
                      setSubmitting(false)
                      this.navigateToSignin() 
                    })
                    .catch(err => {
                      alert('Failed to sign you up! If you already have an account, log in directly!');
                      console.log('Error getting user.', err)
                    })
                }
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isValidating,
                isSubmitting,
              }) => (
                <View style={styles.form}>
                  {(isValidating || isSubmitting) ? (
                    <ActivityIndicator
                      style={styles.activity}
                      size='large'
                    />
                  ) : (
                    <View>
                      <View style={styles.fields}>
                        <View style={styles.row}>
                          <TextInput
                            name='email'
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder='Email'
                            textContentType='emailAddress'
                            value={values.email}
                            autoCapitalize='none'
                            keyboardType='email-address'
                          />
                        </View>
                        <View style={styles.row}>
                          <TextInput
                            name='username'
                            style={styles.input}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            placeholder='Username'
                            textContentType='username'
                            value={values.username}
                            autoCapitalize='none'
                          />
                        </View>
                        <View style={styles.row}>
                          <TextInput
                            name='password'
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder='Password'
                            textContentType='password'
                            secureTextEntry={true}
                          />
                        </View>
                        <View style={styles.row}>
                          <TextInput
                            name='passwordConfirm'
                            style={styles.input}
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm}
                            placeholder='Confirm Password'
                            textContentType='password'
                            secureTextEntry={true}
                          />
                        </View>
                      </View>
                      
                      {isValidating && <Text>Validating</Text>}
                      {isSubmitting && <Text>Submitting</Text>}
                        
                      <View style={styles.admin}>
                        
                        <TouchableOpacity
                          style={styles.button}
                          onPress={handleSubmit}
                          disabled={isSubmitting}
                        >
                          <Text
                            style={styles.buttonLabel}
                            accessibilityLabel='Sign Up'>
                            Sign Up
                          </Text>
                        </TouchableOpacity>
                        
                        <View style={styles.divider_bar}></View> 

                        <View style={styles.bottomLinks}>
                          <Text
                            style={styles.link}
                            onPress={this.navigateToSignin}
                          >
                            Sign In
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              )}
                
              
            </Formik> */}
          </View>
        </KeyboardAvoidingView>
      </ScreenContent>
    )
}

export default SignUpScreen

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