import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {CalendarDaysIcon, ClockIcon} from 'react-native-heroicons/outline'
import {Divide} from '../components'
import {AlertDialog, Button} from 'native-base'
import {useNavigation} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {cancelBooking} from '../services/booking/bookingSlice'

const BookingItem = ({day, start, end, tracking, sportCenter, address, key, id}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const dispatch = useDispatch()

  const cancelRef = React.useRef(null)

  const navigation = useNavigation()

  const limit = (string, length, end = '...') => {
    return string.length < length ? string : string.substring(0, length) + end
  }

  const handleCancelBooking = (id) => {
    dispatch(cancelBooking(id))
    setIsOpen(false)
  }

  return (
    <TouchableOpacity
      id={key}
      onPress={() =>
        navigation.navigate('BookingDetailScreen', {
          day,
          start,
          end,
          tracking,
          sportCenter,
          address,
          key,
          id,
        })
      }
      className="border p-4 rounded-xl border-gray-500 mt-8"
    >
      <View className="flex-col space-y-2 items-center space-x-8 pb-4">
        <View className="flex-row space-x-1 items-center">
          <CalendarDaysIcon size={20} color={'#000'} />
          <Text className="font-bold text-base">{day}</Text>
        </View>
        <View className="flex-row space-x-1 items-center">
          <ClockIcon size={20} color={'#000'} />
          <Text className="font-bold text-base">
            {start} - {end}
          </Text>
        </View>
        <View className="bg-[#e6e6ea] w-20 h-10 items-center justify-center rounded-lg">
          <Text>{tracking}</Text>
        </View>
      </View>

      <Divide height={1} />

      <View className="flex-row justify-between pt-4">
        <View>
          <Text className="text-gray-500">{limit(address, 30)}</Text>
          <Text className="font-bold text-base mt-1">{sportCenter}</Text>
        </View>

        <View>
          <Button colorScheme="danger" borderRadius={10} onPress={() => setIsOpen(!isOpen)}>
            Cancel
          </Button>
          <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Cancel booking</AlertDialog.Header>
              <AlertDialog.Body>Are you sure to cancel this booking?</AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="danger" onPress={() => handleCancelBooking(id)}>
                    Yes
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default BookingItem
