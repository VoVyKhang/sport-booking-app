import {axiosClient} from '../../api/axiosClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {setError, setMessageSuccess} from './authSlice'

export const registerUserThunk = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`/user/register-user`, params.newUserOptions)
    if (res) {
      thunkAPI.dispatch(setMessageSuccess('Create user account successfully'))
      params.navigation.navigate('LoginScreen', {replace: true})
    }
    return res
  } catch (error) {
    console.log('register error thunk: ', error)
    return thunkAPI.rejectWithValue(error)
  }
}

export const loginUserThunk = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`/user/login`, params.user)
    await AsyncStorage.setItem('accessToken', JSON.stringify(res.token))
    await AsyncStorage.setItem('refreshToken', JSON.stringify(res.user?.refreshToken))
    if (res) {
      params.navigation.navigate('HomeRoot', {replace: true})
    }
    return res
  } catch (error) {
    console.log('login error thunk: ', error)
    const message = await error.data.message
    thunkAPI.dispatch(setError(message))
  }
}

export const getTokenThunk = async (email, thunkAPI) => {
  try {
    const response = await axiosClient.post(`/user/forgot-password-token`, email)
    return response
  } catch (error) {
    console.log('get booking detail error thunk: ', error)
    return thunkAPI.rejectWithValue(error)
  }
}
