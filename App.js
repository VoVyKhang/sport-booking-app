import {FontAwesome, Ionicons, AntDesign} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NativeBaseProvider} from 'native-base'
import React from 'react'
import {COLORS} from './src/constants'
import {
  HomeScreen,
  LoginScreen,
  OwnerSearchScreen,
  ProfileScreen,
  RegistrationScreen,
} from './src/screens'
// import Toast from 'react-native-toast-message'

import {ModalPortal} from 'react-native-modals'
import SportFieldDetailScreen from './src/screens/SportFieldDetailScreen'
import BookingUserScreen from './src/screens/BookingUserScreen'
import SportCenterUserScreen from './src/screens/SportCenterUserScreen'
import FieldScreen from './src/screens/FieldScreen'
import BookingReviewScreen from './src/screens/BookingReviewScreen'
import MyBookingScreen from './src/screens/MyBookingScreen'
import BookingSuccessScreen from './src/screens/BookingSuccessScreen'
import BookingDetailScreen from './src/screens/BookingDetailScreen'
import NotificationScreen from './src/screens/NotificationScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import ChangePasswordScreen from './src/screens/ChangePasswordScreen'
import ChangeLanguageScreen from './src/screens/ChangeLanguageScreen'
import GetHelpScreen from './src/screens/GetHelpScreen'
import NotificationProfileScreen from './src/screens/NotificationProfileScreen'
import EditProfileScreen from './src/screens/EditProfileScreen'
import {Provider} from 'react-redux'
import {store} from './src/services/configStore'
import {registerRootComponent} from 'expo'
import FilterScreen from './src/screens/FilterScreen'

export default function App() {
  const Tab = createBottomTabNavigator()
  const Stack = createNativeStackNavigator()

  function UserBottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              borderTopWidth: 1,
              borderColor: COLORS.primary,
            },
          ],
        }}
      >
        {/* User home */}
        <Tab.Screen
          name="UserHome"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Ionicons name="ios-home" size={25} color={focused ? COLORS.primary : COLORS.black} />
            ),
          }}
        />

        <Tab.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            tabBarLabel: 'Filter',
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="ios-search"
                size={25}
                color={focused ? COLORS.primary : COLORS.black}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesome
                name="user-circle-o"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            {/* <Toast /> */}
            {/* <UserBottomTabs /> */}
            <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen
                options={{headerShown: false}}
                name="LoginScreen"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="RegistrationScreen"
                component={RegistrationScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="HomeScreen"
                component={HomeScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="HomeRoot"
                component={UserBottomTabs}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="SportCenter"
                component={SportCenterUserScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="SportFieldDetail"
                component={SportFieldDetailScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="FieldScreen"
                component={FieldScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="BookingScreen"
                component={BookingUserScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="BookingReviewScreen"
                component={BookingReviewScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="MyBookingScreen"
                component={MyBookingScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="BookingSuccessScreen"
                component={BookingSuccessScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="BookingDetailScreen"
                component={BookingDetailScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="NotificationScreen"
                component={NotificationScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="ChangeLanguageScreen"
                component={ChangeLanguageScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="GetHelpScreen"
                component={GetHelpScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="NotificationProfileScreen"
                component={NotificationProfileScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="ProfileScreen"
                component={ProfileScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="EditProfileScreen"
                component={EditProfileScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="FilterScreen"
                component={FilterScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
        <ModalPortal />
      </Provider>
    </>
  )
}

registerRootComponent(App)
