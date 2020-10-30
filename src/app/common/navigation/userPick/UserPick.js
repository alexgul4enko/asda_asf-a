import { View } from 'react-native'
import Icon from 'common/widgets/Icon'
import Link from 'common/widgets/link'
import { hasPermission } from '@cranium/access'
import { access } from 'common/session'
import styles from './user-pick.styles'

export default function NavigationButtons() {
  return (
    <View style={styles.row}>
      <Link style={styles.favourites} to={hasPermission(access.F_UNAUTHORISED) ? 'Login' : 'Favourites'}>
        <Icon name="favourite-01" size={20}/>
      </Link>
      <Link style={styles.cart} to="Cart">
        <Icon name="cart" size={20}/>
      </Link>
    </View>
  )
}
