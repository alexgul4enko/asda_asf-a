import { SafeAreaView, Text, View } from 'react-native'
import Button from 'common/widgets/button'
import styles from './push-notifications.styles'

export default function PushNotificationsView({ setupNotification, skip }) {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.text}>some text to ask user for push notifications</Text>
      <View style={styles.footer}>
        <Button
          title="Enable"
          onPress={setupNotification}
          primary
          style={styles.btn}
        />
        <Button
          title="later"
          onPress={skip}
          style={styles.btn}
        />
      </View>
    </SafeAreaView>
  )
}
