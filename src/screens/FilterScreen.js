import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native'
import {Image} from 'react-native'
import {logo_white} from '../constants/images'
import {ArrowLeftIcon} from 'react-native-heroicons/outline'
import {useDispatch, useSelector} from 'react-redux'
import {Box, CheckIcon, Select} from 'native-base'
import {useState} from 'react'
import {ButtonCustom} from '../components'
import {getSportCentersByFilter} from '../services/sportCenter/sportCenterSlice'

const districts = [
  'Quận 1',
  'Quận 2',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 9',
  'Quận 10',
  'Quận 11',
  'Quận 12',
  'Quận Thủ Đức',
  'Quận Bình Thạnh',
  'Quận Bình Tân',
  'Quận Tân Bình',
  'Quận Tân Phú',
  'Quận Thủ Đức',
  'Quận Gò Vấp',
]

const fieldTypes = ['5 x 5', '7 x 7']

const FilterScreen = ({navigation}) => {
  const {sports} = useSelector((state) => state.sport)
  const [sport, setSport] = useState('')
  const [district, setDistrict] = useState('')
  const [fieldType, setFieldType] = useState('')
  const dispatch = useDispatch()

  const filterSportCenters = () => {
    const options = {
      sportId: sport,
      district: district,
      fieldType: fieldType,
    }
    dispatch(getSportCentersByFilter(options))
  }

  return (
    <SafeAreaView>
      <View className="bg-black w-full h-24 rounded-b-3xl">
        <View className="mt-10 flex-row items-center justify-between px-8">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">Filter</Text>
          <Text></Text>
        </View>
      </View>

      <View className="p-6">
        {/* Sport Type */}
        <View>
          <Text className="text-lg mb-1 font-medium">Choose sport:</Text>
          <Box>
            <Select
              selectedValue={sport}
              minWidth="200"
              borderColor="#00C187"
              accessibilityLabel="Choose sport"
              placeholder="Choose sport"
              fontSize="18px"
              _selectedItem={{
                bg: '#00C187',
                color: '#000',
                endIcon: <CheckIcon size="5" color="#fff" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setSport(itemValue)}
            >
              {sports.map((sport) => (
                <Select.Item id={sport._id} label={sport.name} value={sport._id} />
              ))}
            </Select>
          </Box>
        </View>

        {/* District */}
        <View className="mt-6">
          <Text className="text-lg mb-1 font-medium">Choose district:</Text>
          <Box>
            <Select
              selectedValue={district}
              minWidth="200"
              borderColor="#00C187"
              accessibilityLabel="Choose district"
              placeholder="Choose district"
              fontSize="18px"
              _selectedItem={{
                bg: '#00C187',
                color: '#000',
                endIcon: <CheckIcon size="5" color="#fff" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setDistrict(itemValue)}
            >
              {districts.map((district) => (
                <Select.Item id={district} label={district} value={district} />
              ))}
            </Select>
          </Box>
        </View>

        {/* Field type */}
        {sport === '64af782058ec2364626fbeef' && (
          <View className="mt-6">
            <Text className="text-lg mb-1 font-medium">Choose field type:</Text>
            <Box>
              <Select
                selectedValue={fieldType}
                minWidth="200"
                borderColor="#00C187"
                accessibilityLabel="Choose field type"
                placeholder="Choose field type"
                fontSize="18px"
                _selectedItem={{
                  bg: '#00C187',
                  color: '#000',
                  endIcon: <CheckIcon size="5" color="#fff" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setFieldType(itemValue)}
              >
                {fieldTypes.map((fieldType) => (
                  <Select.Item id={fieldType} label={fieldType} value={fieldType} />
                ))}
              </Select>
            </Box>
          </View>
        )}

        <View>
          <ButtonCustom
            title="Filter"
            marginVertical={40}
            borderRadius={10}
            onPress={() => {
              filterSportCenters()
              navigation.navigate('SportCenter')
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FilterScreen
