import { HeaderBackButton } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

export default function({ route }) {
  return {
    title: gettext('Order complete'),
    headerLeft: props => <BackButton {...props}/>,
  }
}


function BackButton(props) {
  const navigation = useNavigation()
  const handlePress = useCallback(() => {
    navigation.navigate('main')
  }, [navigation.navigate])
  return (
    <HeaderBackButton
      {...props}
      onPress={handlePress}
    />
  )
}
