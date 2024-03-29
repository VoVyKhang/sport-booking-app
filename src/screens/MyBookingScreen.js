import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {COLORS, images} from '../constants'
import {ArrowBackIcon} from 'native-base'
import BookingItem from '../components/BookingItem'
import {useNavigation} from '@react-navigation/native'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllBooking} from '../services/booking/bookingSlice'
import {ScrollView} from 'react-native'
import {Loader} from '../components'

const {width, height} = Dimensions.get('window')

const listTab = [
  {
    status: 'Upcoming',
    path: 'upcoming',
  },
]

const MyBookingScreen = ({navigation}) => {
  const [status, setStatus] = useState('upcoming')
  const dispatch = useDispatch()
  const {bookingHistory: booking, isLoading} = useSelector((state) => state.booking)
  const {sportCenterDetail} = useSelector((state) => state.sportCenter)
  const bookingHistory = [...booking]
    .sort((a, b) => b.date - a.date)
    .filter((item) => item.status === true)

  const setStatusFilter = (status) => {
    setStatus(status)
  }

  useEffect(() => {
    dispatch(getAllBooking())
  }, [])

  console.log(bookingHistory)

  return (
    <SafeAreaView className="flex-1">
      {isLoading ? (
        <Loader visible={true} />
      ) : (
        <>
          <View className="flex-row justify-between items-center mx-4 my-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowBackIcon size={22} color="#000" />
            </TouchableOpacity>
            <Text className="text-[20px] font-bold">My Booking</Text>
          </View>

          <View className="flex-1">
            {/* <View className="flex-row items-center justify-center border-b-2 border-gray-300 mb-3">
          {listTab.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row justify-center px-5 py-3"
              style={[styles.btnTab, status === item.path && styles.btnTabActive]}
              onPress={() => setStatusFilter(item.path)}
            >
              {status === item.path ? (
                <Text className="text-[16px] text-[#00C187] font-bold">{item.status}</Text>
              ) : (
                <Text className="text-[16px] ">{item.status}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View> */}

            {/* Content tab */}
            <ScrollView>
              {/* {status === 'upcoming' && ( */}
              <View className=" mx-4">
                {bookingHistory.length > 0 ? (
                  bookingHistory.map((item) => {
                    return (
                      item.status === true && (
                        <BookingItem
                          status={item.status}
                          key={item._id}
                          id={item._id}
                          day={item.date}
                          start={item.start}
                          end={item.end}
                          tracking={item.tracking}
                          sportCenter={sportCenterDetail.name}
                          address={sportCenterDetail.address}
                        />
                      )
                    )
                  })
                ) : (
                  <View className="items-center mt-4">
                    <Text className="text-base">You don't have any upcoming booking</Text>
                  </View>
                )}
              </View>
              {/* )} */}
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnTab: {
    width: width / 2,
  },
  btnTabActive: {
    color: COLORS.primary,
    borderColor: COLORS.primary,
    borderBottomWidth: 2,
  },
})

export default MyBookingScreen
