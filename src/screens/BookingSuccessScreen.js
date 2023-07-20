import {View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  background_success,
  divide,
  left,
  right,
  sanBong,
  soccer_field,
  success_icon,
  ticket_fill,
  vector,
} from '../constants/images'
import {ArrowLeftIcon, MapPinIcon, PhoneIcon, StarIcon} from 'react-native-heroicons/outline'
import {ButtonCustom, Divide, Loader} from '../components'
import {useSelector} from 'react-redux'

const BookingSuccessScreen = ({navigation, route}) => {
  const {sportCenterDetail} = useSelector((state) => state.sportCenter)
  const {message, isLoading} = useSelector((state) => state.booking)
  const {date, start, end, price, fieldType} = route.params
  return (
    <SafeAreaView>
      <Image source={background_success} className="w-full h-full relative" />
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-6 left-4">
        <ArrowLeftIcon size={22} color="#000" />
      </TouchableOpacity>

      {isLoading ? (
        <Loader visible={true} />
      ) : (
        <>
          <View className="absolute top-12 left-40">
            <Image source={success_icon} />
          </View>
          <View className="absolute top-36 items-center left-6">
            <Text className="text-[24px] font-bold">Your booking was successfully!</Text>
            <Text className="mt-2 text-base">We received your booking request.</Text>
            <Text className=" text-base">We'll let you know once it is confirmed</Text>
          </View>
          <ScrollView className="absolute bg-white w-[344] h-[440] mb-12 top-64 left-6 rounded-3xl">
            <Image source={divide} className="mx-6" />

            <View className="flex-row items-center self-center space-x-2 -mt-12">
              <Image source={ticket_fill} />
              <Text className="tracking-widest text-[18px] font-bold">
                {sportCenterDetail.name}
              </Text>
            </View>

            <Text className="mt-6 px-4 text-sm text-gray-600">Date & time</Text>
            <View className="flex-row px-4 justify-between">
              <Text className="text-[18px]">
                {date} | {start} - {end}
              </Text>
              {/* <View className="bg-[#e6e6ea] w-20 h-10 items-center -mt-3 justify-center rounded-lg">
            <Text>Pending</Text>
          </View> */}
            </View>

            <Image source={{uri: sportCenterDetail?.image[0]}} className="w-full h-36 mt-4" />

            <View className="p-3 pr-2">
              <View className="flex-row space-x-2 mt-1 pr-6">
                <MapPinIcon size={24} color="#00C187" />
                <Text className="text-gray-600">{sportCenterDetail.address}</Text>
              </View>
              <View className="flex-row space-x-2 ml-1 mt-2">
                <PhoneIcon size={24} color="#00C187" />
                <Text className="text-gray-600">0914360736</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-2 mt-2 ml-1">
                  <Image source={soccer_field} className="w-7 h-7" />
                  <Text>{fieldType}</Text>
                </View>
                <View className="flex-row space-x-1 items-center pr-4">
                  <StarIcon size={24} color={'#00C187'} />
                  <Text>{sportCenterDetail.totalrating}</Text>
                </View>
              </View>

              <View className="flex-row items-center mt-2">
                <Text className="text-orange-500 text-base">Pay before: </Text>
                <Text className="text-base to-gray-400">18:00 - {date}</Text>
              </View>

              <View className="flex-row justify-end space-x-2 mt-4 pb-2 items-center">
                <Image source={vector} />

                <Text className="text-[20px] font-bold">{price} VND</Text>
              </View>
            </View>

            <View className="flex-row mt-4 ">
              <TouchableOpacity
                onPress={() => navigation.navigate('MyBookingScreen')}
                className="bg-[#33cd9f] w-[344] h-14 rounded-bl-3xl rounded-br-3xl items-center justify-center"
              >
                <Text className="text-white font-bold text-[20px]">MY BOOKING</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity className="bg-[#00C187] w-[168] h-14 rounded-br-3xl items-center justify-center">
            <Text className="text-white font-bold text-[20px]">PAY NOW</Text>
          </TouchableOpacity> */}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  )
}

export default BookingSuccessScreen
