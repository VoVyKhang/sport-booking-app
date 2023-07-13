import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import React, {useEffect} from 'react'
import {
  ArrowLeftIcon,
  BellIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from 'react-native-heroicons/outline'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {getAllSportCenters} from '../services/sportCenter/sportCenterSlice'
import {useState} from 'react'

const SportCenterUserScreen = ({route}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {sportCenters, isLoading} = useSelector((state) => state.sportCenter)

  const limit = (string, length, end = '...') => {
    return string.length < length ? string : string.substring(0, length) + end
  }

  console.log('sport center: ', sportCenters)

  const renderItem = ({item}) => {
    console.log('item', item)
    return (
      item.status === true && (
        <TouchableOpacity onPress={() => navigation.navigate('SportFieldDetail', {id: item._id})}>
          <View className="p-3 mx-4 my-2 flex-row bg-white rounded-xl space-x-4">
            <View className="w-28 h-28 items-center justify-center">
              <Image source={{uri: item.image}} resizeMethod="scale" className="w-28 h-28" />
            </View>
            <View className="w-full">
              <Text className="text-[18px] w-52 font-bold tracking-widest">{item.name}</Text>
              <Text className="font-bold w-52 text-[#9f9d9d] mt-2">{limit(item.address, 26)}</Text>
              <View className="flex-row items-center mt-2 space-x-1">
                <StarIcon color={'green'} opacity={0.5} size={22} />
                <Text className="text-black text-xs">{item.totalrating}</Text>
              </View>
            </View>

            {/* <View className="w-full h-[0.3] absolute bottom-7 mb-3 bg-black"></View> */}
          </View>
        </TouchableOpacity>
      )
    )
  }

  return (
    <SafeAreaView className="relative pb-8">
      {/* Appbar */}
      <View className="bg-black w-full h-44 rounded-b-3xl">
        <View className="mt-10 flex-row items-center justify-between px-8">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">Sport Center</Text>
          <BellIcon size={24} color="#fff" />
        </View>
      </View>

      {/* Body */}
      <View className="bg-[#ECF3FF] w-full h-full -mt-20 rounded-tl-3xl rounded-tr-3xl">
        <View className="flex-row p-3 space-x-2 items-center border-2 border-[#00C187] mt-4 mx-4 rounded-lg">
          <MagnifyingGlassIcon size={24} color="#000" />
          <TextInput placeholder="Enter something" keyboardType="default" />
        </View>

        <View className="flex-1 w-full mt-4">
          {isLoading ? (
            <ActivityIndicator className="mt-14" size="large" color="#00ff00" />
          ) : sportCenters.length > 0 ? (
            <FlatList
              data={sportCenters}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <Text>Nothing</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SportCenterUserScreen
