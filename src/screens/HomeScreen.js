import {View, Text, Image, StatusBar, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useRef} from 'react'
import images, {logo_white, soccer_field, term, union} from '../constants/images'
import {BellIcon, MapPinIcon, StarIcon} from 'react-native-heroicons/outline'
import {useNavigation} from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllSports} from '../services/sport/sportSlice'
import {FlatList} from 'react-native'
import {getAllSportCenters} from '../services/sportCenter/sportCenterSlice'
import Toast from 'react-native-toast-message'

const HomeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {sports, isLoading} = useSelector((state) => state.sport)
  const {sportCenters, isLoading: loading} = useSelector((state) => state.sportCenter)
  // const sportCenterFeatured = sportCenters.filter((sport) => sport.totalrating >= '5')

  useEffect(() => {
    dispatch(getAllSports())
    dispatch(getAllSportCenters())
  }, [])

  const sportCenterFeatured = useRef(sportCenters?.filter((sport) => sport.totalrating >= '5'))

  const limit = (string, length, end = '...') => {
    return string.length < length ? string : string.substring(0, length) + end
  }

  const getSportCenters = (id) => {
    dispatch(getAllSportCenters(id))
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // getSportCenters(item._id)
          navigation.navigate('SportCenter', {id: item._id})
        }}
        className="w-28 h-28 my-2 bg-[#e7e8ea] shadow-lg shadow-gray-500 items-center justify-center mx-2 rounded-xl"
      >
        <Image source={{uri: item.image}} className="w-20 h-20" />
        <Text className="mb-2 text-base">{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const renderItemFeatured = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SportFieldDetail', {id: item._id})}
        className="bg-white mr-3 shadow"
      >
        <Image source={{uri: item.image[0]}} className="h-24 w-52 rounded-sm" />

        <View className="px-2 pb-3">
          <Text className="font-bold text-lg pt-2">{item.name}</Text>
          <View className="flex-row items-center space-x-1 mt-1">
            <StarIcon color={'green'} opacity={0.5} size={22} />
            <Text className="text-xs text-gray-500">
              <Text className="text-black font-semibold text-sm">{item.totalrating}</Text>
            </Text>
          </View>
          <View className="flex-row items-center mt-2 space-x-1">
            <MapPinIcon color={'gray'} opacity={0.4} size={22} />
            <Text className="text-xs text-gray-500">{limit(item.address, 30)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View className="flex-1">
      <StatusBar backgroundColor="#000" />
      {/* Header */}
      <View className="bg-black w-full h-44 rounded-b-3xl">
        <View className="flex-row items-center px-4 mt-6 justify-between">
          <View className="flex-row items-center space-x-1">
            <Image source={logo_white} className="h-8 w-8" />
            <Text className="text-white text-[26px] font-bold tracking-widest">TheThaoPlus</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MyBookingScreen')}>
            <BellIcon size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="z-50 w-[360px] h-[160] mx-8 mt-8 rounded-3xl">
          <Swiper autoplay loop>
            <Image source={images.soccer} className="rounded-2xl w-80" style={{height: 152}} />
            <Image source={images.tennis} className="rounded-2xl w-80" style={{height: 152}} />
            <Image source={images.caulong} className="rounded-2xl w-80" style={{height: 152}} />
          </Swiper>
        </View>
      </View>

      {/* Sport List */}
      <View className="w-full mt-20 ml-1">
        {isLoading ? (
          <ActivityIndicator className="mt-14" size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={sports}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
      {/* 
  
          

      {/* Featured List */}
      <View className="w-full ml-1 mt-3 mx-3">
        {loading ? (
          <ActivityIndicator className="mt-14" size="large" color="#00ff00" />
        ) : sportCenterFeatured?.current?.length <= 0 ? (
          <View className="items-center mt-4">
            <Text className="text-base ">This sport doesn't have any featured sport center</Text>
          </View>
        ) : (
          <FlatList
            data={sportCenterFeatured?.current}
            horizontal
            renderItem={renderItemFeatured}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  )
}

export default HomeScreen
