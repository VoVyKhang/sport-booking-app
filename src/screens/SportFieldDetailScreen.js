import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  Pressable,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import Swiper from 'react-native-swiper'
import {COLORS, images} from '../constants'
import {AntDesign, Entypo, FontAwesome5, Ionicons, Octicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {FontAwesome} from '@expo/vector-icons'
import {Feather} from '@expo/vector-icons'
import {ButtonCustom, Divide, Loader} from '../components'
const {width, height} = Dimensions.get('window')

import {TabView, SceneMap} from 'react-native-tab-view'
import {Box, NativeBaseProvider, useColorModeValue} from 'native-base'
import {camera, car, house, sanBong1, shirt, shop} from '../constants/images'
import {ClockIcon, StarIcon, UserCircleIcon} from 'react-native-heroicons/outline'
import {useDispatch, useSelector} from 'react-redux'
import {getSportCenterDetail} from '../services/sportCenter/sportCenterSlice'
import {getSportFieldType} from '../services/sportField/sportFieldSlice'

var openTime = ''
var closeTime = ''

const FirstRoute = () => {
  return (
    <View className="mt-2">
      <Text className="mt-1 mb-2 text-[18px] font-bold px-1">Facilities</Text>
      <View className="flex-row justify-between px-4">
        <View className="flex-row space-x-1 items-center">
          <Image source={car} size={24} />
          <Text className="text-base">Parking sport</Text>
        </View>

        <View className="flex-row space-x-1 items-center">
          <Image source={shop} size={24} />
          <Text className="text-base">Water shop </Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-3 px-4">
        <View className="flex-row space-x-1 items-center">
          <Image source={shirt} size={24} />
          <Text className="text-base">Changing rooms</Text>
        </View>

        <View className="flex-row space-x-1 items-center">
          <Image source={house} size={24} />
          <Text className="text-base">Waiting area</Text>
        </View>
      </View>

      <View className="flex-row mt-3 px-4 space-x-1 items-center">
        <Image source={camera} size={24} />
        <Text className="text-base">Camera</Text>
      </View>
    </View>
  )
}

const SecondRoute = () => (
  <ScrollView className="px-3 h-10">
    <View className="mb-3 mt-3 px-1">
      <View className="flex-row mb-1">
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
      </View>
      <Text className="mb-1 text-xs">Nice field, nice service</Text>
      <View className="flex-row items-center">
        <UserCircleIcon size={20} color={'#000'} />
        <Text className="ml-1">Sean B.</Text>
        <Text className="text-xs ml-4">May 17, 2023</Text>
      </View>
    </View>
    <Divide backgroundColor="black" height={2} />

    {/* <View className="mb-3 mt-3 px-1">
      <View className="flex-row mb-1">
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
        <StarIcon size={18} color={'#00C187'} />
      </View>
      <Text className="mb-1 text-xs">Nice field, nice service</Text>
      <View className="flex-row items-center">
        <UserCircleIcon size={20} color={'#000'} />
        <Text className="ml-1">Sean B.</Text>
        <Text className="text-xs ml-4">May 17, 2023</Text>
      </View>
    </View>
    <Divide backgroundColor="black" height={2} /> */}
  </ScrollView>
)

const ThirdRoute = () => (
  <View className="mt-10">
    <View className="flex-row space-x-2 px-3 py-4">
      <ClockIcon size={48} color={'#00C187'} />
      <View className="space-y-1">
        <Text className="text-sm text-gray-500">Mon - Sun</Text>
        <Text className="text-base font-bold">
          {openTime} - {closeTime}
        </Text>
      </View>
    </View>
  </View>
)

const initialLayout = {
  width: Dimensions.get('window').width,
}
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
})

const SportFieldDetailScreen = ({route, navigation}) => {
  const {sportCenterDetail, isLoading} = useSelector((state) => state.sportCenter)
  const dispatch = useDispatch()
  openTime = sportCenterDetail.openTime
  closeTime = sportCenterDetail.closeTime

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'About Pitches',
    },
    {
      key: 'second',
      title: 'Reviews',
    },
    {
      key: 'third',
      title: 'Activities',
    },
  ])

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
          })
          const color =
            index === i
              ? useColorModeValue('#00C187', '#00C187')
              : useColorModeValue('#1f2937', '#a1a1aa')
          const borderColor =
            index === i ? '#00C187' : useColorModeValue('coolGray.200', 'gray.400')
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
            >
              <Pressable
                onPress={() => {
                  setIndex(i)
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          )
        })}
      </Box>
    )
  }

  const handleGetFieldType = (id) => {
    dispatch(getSportFieldType(id))
    navigation.navigate('BookingScreen', {id: id})
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      {isLoading ? (
        <Loader visible={true} />
      ) : (
        <>
          <View>
            <View className="h-60">
              <Swiper loop autoplay activeDotColor={COLORS.black}>
                {sportCenterDetail?.image?.map((image, index) => (
                  <Image
                    source={{
                      uri: image,
                    }}
                    key={index}
                    className="w-full h-full"
                  />
                ))}
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
          </View>

          <View
            className="flex-1 bg-[#ECF3FF] absolute w-full h-full rounded-t-3xl p-5"
            style={{top: 220}}
          >
            <Text className="text-[20px] font-bold tracking-wide">{sportCenterDetail?.name}</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center mb-2 mt-2 space-x-2">
                <Feather name="phone" size={22} color={COLORS.primary} />
                <Text className="text-[16px]">0914360736</Text>
              </View>
              <View className="flex-row items-center space-x-1 mb-2">
                <FontAwesome name="star" size={22} color={COLORS.yellow} />
                <Text className="text-[16px]">{sportCenterDetail?.totalrating}</Text>
              </View>
            </View>
            <Divide backgroundColor="grey" height={2} />
            <View className="flex-row gap-2 mb-4 mt-2 space-x-4">
              <View className="w-20 h-20">
                <Image
                  source={{
                    uri: sportCenterDetail?.image[0],
                  }}
                  className="rounded-lg w-full h-full"
                />
              </View>

              <View className="space-y-3" style={{width: width - 130}}>
                <Text className="text-[16px] text-gray-500 font-bold tracking-wide">
                  {sportCenterDetail?.address}
                </Text>
              </View>
            </View>
            <Divide backgroundColor="grey" height={2} />
            {/* </ScrollView> */}
            <NativeBaseProvider>
              <TabView
                navigationState={{
                  index,
                  routes,
                }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                id={index}
                initialLayout={initialLayout}
                style={{
                  marginTop: 12,
                }}
              />
            </NativeBaseProvider>
          </View>
          <ButtonCustom
            height={36}
            width={200}
            borderRadius={12}
            title="Book"
            marginVertical={400}
            marginHorizontal={100}
            onPress={() => handleGetFieldType(sportCenterDetail._id)}
          />
        </>
      )}
    </SafeAreaView>
  )
}

export default SportFieldDetailScreen
