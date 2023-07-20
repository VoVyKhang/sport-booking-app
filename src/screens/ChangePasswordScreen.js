import React, {useState} from 'react'
import {View, Text, SafeAreaView, TouchableOpacity, Keyboard} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ArrowLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Input from '../components/input'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import {COLORS} from '../constants'
import {ButtonCustom} from '../components'
import {Alert} from 'react-native'
import {useDispatch} from 'react-redux'
import {changePassword} from '../services/auth/authSlice'

const ChangePasswordScreen = ({navigation}) => {
  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  })

  const dispatch = useDispatch()

  const handleError = (error, input) => {
    setErrors((prevState) => ({...prevState, [input]: error}))
  }

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({...prevState, [input]: text}))
  }

  const handleChangePassword = () => {
    Keyboard.dismiss()
    let isValid = true

    if (!inputs.oldPassword) {
      handleError('Please input current password', 'oldPassword')
      isValid = false
    }

    if (!inputs.confirmPassword) {
      handleError('Please input confirm password', 'confirmPassword')
      isValid = false
    }

    if (!inputs.password) {
      handleError('Please input password', 'password')
      isValid = false
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password')
      isValid = false
    }

    if (inputs.confirmPassword !== inputs.password) {
      Alert.alert('Confirm password should be the same with the password')
    }

    if (isValid) {
      console.log('inputs:', inputs)
      let options = {
        inputs,
        navigation,
      }
      dispatch(changePassword(options))
    }
  }

  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center mx-6 mt-8">
        <TouchableOpacity onPress={() => navigation.goBack()} className="">
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} className="">
          <Text className="text-[20px] font-bold tracking-widest">Login</Text>
        </TouchableOpacity>
      </View>

      <View className="mx-6 mt-8">
        <Text className="text-[24px] font-bold">Change password</Text>
        <Text className="text-gray-500 mt-2">
          The new password should contain min 8 characters.
        </Text>
      </View>

      <View className="mx-6 mt-8">
        <Input
          onChangeText={(text) => handleOnchange(text, 'oldPassword')}
          onFocus={() => handleError(null, 'oldPassword')}
          icon={<FontAwesome name="lock" size={24} color={COLORS.lightPrimary} />}
          lable="Current password"
          placeholder="Enter your current password"
          error={errors.oldPassword}
          password
          borderColor="#00C189"
        />

        <Input
          onChangeText={(text) => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          icon={<FontAwesome name="lock" size={24} color={COLORS.lightPrimary} />}
          lable="New password"
          placeholder="Enter your new password"
          error={errors.password}
          password
          borderColor="#00C189"
        />

        <Input
          onChangeText={(text) => handleOnchange(text, 'confirmPassword')}
          onFocus={() => handleError(null, 'confirmPassword')}
          icon={<FontAwesome name="lock" size={24} color={COLORS.lightPrimary} />}
          lable="Confirm password"
          placeholder="Enter your confirmation password"
          error={errors.confirmPassword}
          password
          borderColor="#00C189"
        />
      </View>

      <View className="mx-14">
        <ButtonCustom
          title="Change password "
          borderRadius={10}
          marginVertical={20}
          onPress={handleChangePassword}
        />
      </View>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen
