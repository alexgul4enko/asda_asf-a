import { SafeAreaView, Text, View } from 'react-native'
import Button from 'common/widgets/button'
import styles from './push-notifications.styles'

export default function PushNotificationsView({ setupNotification, skip }) {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>{gettext('Be the first to know')}</Text>
      <Text style={styles.text}>{gettext('Allow notifications for tailored new arrivals, trends and promotions')}</Text>
      <Button
        title={gettext('Yes, notify me')}
        onPress={setupNotification}
        primary
        style={styles.btn}
      />
      <Button
        title={gettext('Not now, maybe later')}
        onPress={skip}
        style={styles.btn}
      />
    </SafeAreaView>
  )
}
