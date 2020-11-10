import { View, Text } from 'react-native'
import Link from 'common/widgets/link'
import styles from './meet-us.styles'


export default function MeetUs() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{gettext('LET`S GET PERSONAL')}</Text>
      <Text style={styles.desc}>{gettext('Sign in for a tailored shopping experience')}</Text>
      <View style={styles.row}>
        <Link to="Register" outline style={styles.btn}>
          <Text>{gettext('Register')}</Text>
        </Link>
        <Link to="Login" primary style={styles.btn}>
          <Text style={styles.signIn}>{gettext('Sign in')}</Text>
        </Link>
      </View>
    </View>
  )
}
