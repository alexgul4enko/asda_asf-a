import { SafeAreaView, Text } from 'react-native'
import Button from 'common/widgets/button'
import styles from './gender.styles'

export default function PushNotificationsView({ women, men }) {
  return (
    <SafeAreaView style={styles.page}>
      <Button
        title="women"
        onPress={women}
        primary
      />
      <Button
        title="men"
        onPress={men}
        primary
      />
    </SafeAreaView>
  )
}
