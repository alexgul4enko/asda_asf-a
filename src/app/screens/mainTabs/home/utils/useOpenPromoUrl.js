import { Linking } from 'react-native'
import navigateByUrl, { canHanldeUrl } from 'common/notifications/navigateByUrl'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import get from 'lodash/get'


export default function useOpenPromoUrl(promotion) {
  const navigation = useNavigation()
  return useCallback(() => {
    if(!get(promotion, 'url')) { return }
    if(canHanldeUrl(promotion.url)) {
      return navigateByUrl(promotion.url, navigation.navigate)
    }
    return Linking.openURL(promotion.url)
  }, [promotion, navigation.navigate])
}
