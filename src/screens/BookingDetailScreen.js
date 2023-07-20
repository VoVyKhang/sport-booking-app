import {View, Text, SafeAreaView, Image} from 'react-native'
import React from 'react'
import {AntDesign, Entypo, FontAwesome5, Ionicons, Octicons} from '@expo/vector-icons'
import Swiper from 'react-native-swiper'
import {COLORS, images} from '../constants'
import {useNavigation} from '@react-navigation/native'
import {map, soccer_field, ticket_fill, vector} from '../constants/images'
import {Divide} from '../components'
import {PhoneIcon, StarIcon} from 'react-native-heroicons/outline'
import {useSelector} from 'react-redux'

const BookingDetailScreen = ({route, navigation}) => {
  const {day, start, end, tracking, sportCenter, address, key, id} = route.params
  const {sportCenterDetail} = useSelector((state) => state.sportCenter)

  return (
    <SafeAreaView>
      <View>
        <View className="h-60">
          <Swiper loop autoplay activeDotColor={COLORS.black}>
            <Image source={{uri: sportCenterDetail?.image[0]}} className="w-full h-full" />
          </Swiper>
        </View>

        <View className="flex-row items-center justify-between p-4 absolute w-full">
          <View className="bg-[#00C187] w-10 h-10 rounded-full flex items-center justify-center opacity-80">
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>

        <View className="p-6">
          <View className="flex-row items-center space-x-2">
            <Image source={ticket_fill} />
            <Text className="tracking-widest text-[22px] font-bold">{sportCenterDetail.name}</Text>
          </View>

          <Text className="mt-4 mb-1 text-sm text-gray-600">Date & time</Text>
          <View className="flex-row justify-between mb-6">
            <View className="text-[20px] flex-col">
              <Text className="text-[18px]">{day}</Text>
              <Text className="text-[18px]">
                {start}- {end}
              </Text>
            </View>
          </View>

          <Divide height={1} />

          <View className="flex-row space-x-4 mt-2">
            <Image source={map} />
            <View className="space-y-1">
              <Text className="text-[16px] w-64 text-gray-500">{sportCenterDetail.address}</Text>
            </View>
          </View>

          <View className="flex-row space-x-2 ml-1 mt-4 items-center">
            <PhoneIcon size={24} color="#00C187" />
            <Text className="text-gray-600 text-base">0914360736</Text>
          </View>

          <View className="flex-row items-center justify-between">
            {/* <View className="flex-row items-center space-x-2 mt-2 ml-1">
              <Image source={soccer_field} className="w-7 h-7" />
              <Text className="text-base">{fieldTyope}</Text>
            </View> */}
            <View className="flex-row space-x-1 items-center mt-2">
              <StarIcon size={24} color={'#00C187'} />
              <Text>{sportCenterDetail.totalrating}</Text>
            </View>
          </View>

          <View className="flex-row items-center mt-2">
            <Text className="text-orange-500 text-[18px] font-bold">Pay before: </Text>
            <Text className="text-[16px] to-gray-400">
              {start} - {day}
            </Text>
          </View>

          {/* <View className="flex-row justify-end space-x-2 mt-6 pb-2 items-center">
            <Image source={vector} />
            <Text className="text-[20px] font-bold">{price} VND</Text>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BookingDetailScreen
