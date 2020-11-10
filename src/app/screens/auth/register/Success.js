import { SafeAreaView, Text } from 'react-native'
import styles from './register.styles'

export default function RegistrationSuccess() {
  return (
    <SafeAreaView style={styles.success}>
      <Text style={styles.title}>
        {gettext('Check your email')}
      </Text>
      <Text style={styles.description}>
        {gettext('Check your email to complete registration process.')}
      </Text>
    </SafeAreaView>
  )
}
