import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {changePasswordThunk, getTokenThunk, loginUserThunk, registerUserThunk} from './authThunk'
// import Toast from 'react-native-toast-message'
import {ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert} from 'react-native'
import {Toast} from 'react-native-toast-message/lib/src/Toast'
// import Toast from 'react-native-toast-message'
// const userfromAsyncStorage = AsyncStorage.getItem('userInfo')
//   ? AsyncStorage.getItem('userInfo')
//   : ''

const initialState = {
  user: {},
  token: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

export const RegisterUser = createAsyncThunk('auth/RegisterUser', registerUserThunk)
export const LoginUser = createAsyncThunk('auth/LoginUser', loginUserThunk)
export const getToken = createAsyncThunk('auth/getToken', getTokenThunk)
export const changePassword = createAsyncThunk('auth/changePassword', changePasswordThunk)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      Alert.alert(action.payload)
    },
    setMessageSuccess: (state, action) => {
      Alert.alert(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.user = action.payload?.user
        state.token = action.payload?.token
        state.message = 'success'
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(getToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.token = action.payload
      })
      .addCase(getToken.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
  },
})

export const {setError, setMessageSuccess} = authSlice.actions
export default authSlice.reducer
