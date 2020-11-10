import { Linking } from 'react-native'
import Config from 'react-native-config'

export default function openUrl(url) {
  Linking.openURL(Config.SITE_URL + url)
}
