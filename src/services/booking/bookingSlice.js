import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
  cancelBookingThunk,
  checkBookingsAvailableThunk,
  createBookingThunk,
  getAllBookingThunk,
  getBookingDetailThunk,
  vaidateDateBooking,
} from './bookingThunk'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  availability: [],
  price: '',
  bookingHistory: [],
  bookingDetails: {},
  sportFieldId: '',
}

export const checkBookingsAvailable = createAsyncThunk(
  'booking/check-bookings-available',
  checkBookingsAvailableThunk
)

export const validateDayBooking = createAsyncThunk(
  'booking/validate-day-booking',
  vaidateDateBooking
)

export const getAllBooking = createAsyncThunk('booking/get-all-booking', getAllBookingThunk)

export const getBookingDetails = createAsyncThunk(
  'booking/get-booking-details',
  getBookingDetailThunk
)

export const cancelBooking = createAsyncThunk('booking/cancel-booking', cancelBookingThunk)

export const createBooking = createAsyncThunk('booking/create-booking', createBookingThunk)

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetAvailability: (state) => {
      state.availability = []
      state.price = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkBookingsAvailable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkBookingsAvailable.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.availability = [...action.payload?.availability]
        state.price = [...action.payload?.price].join('')
        state.sportFieldId = action.payload?.sportFieldId
      })
      .addCase(checkBookingsAvailable.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(validateDayBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(validateDayBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.message = action.payload?.message
      })
      .addCase(validateDayBooking.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getAllBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.bookingHistory = [...action.payload?.bookingHistory]
      })
      .addCase(getAllBooking.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getBookingDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.bookingDetails = {...action.payload?.getBooking}
      })
      .addCase(getBookingDetails.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.message = action.payload?.message
      })
      .addCase(cancelBooking.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })

      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.message = action.payload?.message
      })
      .addCase(createBooking.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  },
})

export const {resetAvailability} = bookingSlice.actions
export default bookingSlice.reducer
