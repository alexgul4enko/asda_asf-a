import { View } from 'react-native'
import { CacheImage } from 'common/widgets'
import styles from './forgotPass.styles'

const source = {
  uri: 'https://www.pinclipart.com/picdir/middle/91-918525_react-logos-download-green-tree-logo-tree-logo.png',
}

export default function ForgotPassword() {
  return (
    <View style={styles.main}>
      <CacheImage
        source={source}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  )
}
