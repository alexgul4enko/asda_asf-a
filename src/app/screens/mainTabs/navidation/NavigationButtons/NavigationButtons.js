import { View } from 'react-native'
import Icon from 'common/widgets/Icon'
import Link from 'common/widgets/link'
import styles from './navigation-buttons.styles'

export default function NavigationButtons() {
  return (
    <View style={styles.row}>
      <Link style={styles.btn} to="Favourites">
        <Icon name="favourite-01"/>
      </Link>
      <Link style={styles.btn} to="Cart">
        <Icon name="cart"/>
      </Link>
    </View>
  )
}
