import get from 'lodash/get'
import navigateByUrl from './navigateByUrl'

export default function handleNotificationClick(message, navigation) {
  const url = get(message, 'data.url')
  navigateByUrl(url, get(navigation, 'current.navigate'))
}
