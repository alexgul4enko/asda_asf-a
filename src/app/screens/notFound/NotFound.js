import { SafeAreaView, Text } from 'react-native'
import styles from './not-found.styles'

export default function NotFound() {
  return (
    <SafeAreaView style={styles.main}>
      <Text>404</Text>
      <Text>not fount</Text>
    </SafeAreaView>
  )
}
