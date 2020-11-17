import { I18nManager } from 'react-native'
import get from 'lodash/get'

export default function({ route }) {
  const title = [gettext('Order'), ' ', '#', get(route, 'params.number')]
  return {
    title: I18nManager.isRTL ? title.reverse() : title,
  }
}
