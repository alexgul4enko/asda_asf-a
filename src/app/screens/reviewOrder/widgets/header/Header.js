import { View, Text } from 'react-native'
import styles from './header.styles'

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{gettext('Congratulation!')}</Text>
      <Text style={styles.subTitle}>{gettext('Your order had been successfully processed')}</Text>
    </View>
  )
}
