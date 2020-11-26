import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useSetData } from '@cranium/resource'
import GenderView from './GenderView'
import analytics from '@react-native-firebase/analytics'

GenderContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default function GenderContainer({ navigation }) {
  const setGender = useSetData('gender')
  const men = useCallback(() => {
    analytics().setUserProperty('Gender', 'M')
    setGender('M')
    navigation.navigate('notifications')
  }, [setGender, navigation.navigate])
  const women = useCallback(() => {
    analytics().setUserProperty('gender', 'F')
    setGender('F')
    navigation.navigate('notifications')
  }, [setGender, navigation.navigate])
  return (
    <GenderView men={men} women={women}/>
  )
}
