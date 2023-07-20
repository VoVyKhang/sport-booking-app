import {useNavigation} from '@react-navigation/native'
import {TouchableOpacity} from 'react-native'

export const ButtonHandle = (props) => {
  const navigation = useNavigation()
  const {navigateName, screen} = props

  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: navigateName}],
    })
    navigation.navigate(navigateName, {screen})
  }

  return <TouchableOpacity {...props} onPress={handlePress} />
}
