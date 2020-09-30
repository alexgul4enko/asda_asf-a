import { useCallback } from 'react'
import { useCache } from 'common/cache'
import GenderView from './GenderView'


export default function GenderContainer({ navigation }) {
  const { setGender } = useCache()
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
