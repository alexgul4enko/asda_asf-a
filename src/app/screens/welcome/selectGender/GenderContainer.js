import { useCallback } from 'react'
import { useSetData } from '@cranium/resource'
import GenderView from './GenderView'


export default function GenderContainer({ navigation }) {
  const setGender = useSetData('gender')
  const men = useCallback(() => {
    setGender('M')
    navigation.navigate('notifications')
  }, [setGender, navigation.navigate])
  const women = useCallback(() => {
    setGender('F')
    navigation.navigate('notifications')
  }, [setGender, navigation.navigate])
  return (
    <GenderView men={men} women={women}/>
  )
}
