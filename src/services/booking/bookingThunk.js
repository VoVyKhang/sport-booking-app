import AsyncStorage from '@react-native-async-storage/async-storage'
import {axiosClient} from '../../api/axiosClient'
import {Alert} from 'react-native'

export const checkBookingsAvailableThunk = async (params, thunkAPI) => {
  const {day, id, fieldType} = params.options
  const accessToken = await AsyncStorage.getItem('accessToken')
  if (accessToken) {
    axiosClient.setHeaderAuth(JSON.parse(accessToken))
    try {
      const response = await axiosClient.getByUrl(
        `/booking/bookings-available?date=${day}&sportCenterId=${id}&fieldType=${fieldType}`
      )
      return response
    } catch (error) {
      console.log('Check booking error thunk: ', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
}

export const vaidateDateBooking = async (options, thunkAPI) => {
  const accessToken = await AsyncStorage.getItem('accessToken')
  if (accessToken) {
    axiosClient.setHeaderAuth(JSON.parse(accessToken))
    try {
      const response = await axiosClient.getByUrl(
        `/booking/validate-date-booking?date=${options.day}&start=${options.startDay}&end=${options.endDay}&sportFieldId=${options.id}`
      )
      if (response.message === 'Sport Field created successfully') {
        console.log('resL: ' + response.message)
        options.navigation.navigate('BookingSuccessScreen', {
          booking: response.newBooking,
          day: options.day,
          slot: options.slot,
          fieldType: options.fieldType,
          id: options.id,
          price: options.price,
        })
      }
      return response
    } catch (error) {
      console.log('Check booking error thunk: ', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
}

export const getAllBookingThunk = async (_, thunkAPI) => {
  console.log('bbbb')
  const accessToken = await AsyncStorage.getItem('accessToken')
  if (accessToken) {
    axiosClient.setHeaderAuth(JSON.parse(accessToken))
    try {
      const response = await axiosClient.getByUrl('/booking/customer-history-booking')
      console.log(response)
      return response
    } catch (error) {
      console.log('get all booking error thunk: ', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
}

export const getBookingDetailThunk = async (id, thunkAPI) => {
  const accessToken = await AsyncStorage.getItem('accessToken')
  if (accessToken) {
    axiosClient.setHeaderAuth(JSON.parse(accessToken))
    try {
      const response = await axiosClient.getByUrl(`/booking/${id}`)
      return response
    } catch (error) {
      console.log('get booking detail error thunk: ', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
}

export const cancelBookingThunk = async (id, thunkAPI) => {
  const accessToken = await AsyncStorage.getItem('accessToken')
  if (accessToken) {
    axiosClient.setHeaderAuth(JSON.parse(accessToken))
    try {
      const response = await axiosClient.putWithId('/booking/cancel-booking/', id)
      if (response.message === 'Booking canceled.') {
        Alert.alert('Booking canceled')
        return response
      }
    } catch (error) {
      console.log('get booking detail error thunk: ', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
}
