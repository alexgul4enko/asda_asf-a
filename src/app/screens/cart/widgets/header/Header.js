import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './header.styles'

Header.propTypes = {
  count: PropTypes.node,
  price: PropTypes.node,
}

Header.defaultProps = {
  count: undefined,
  price: undefined,
}

export default function Header({ count, price }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{gettext('Order summary')}</Text>
      <View style={styles.totals}>
        <Text style={styles.subtitle}>{gettext('Total count')}</Text>
        <Text style={styles.subtitle}>:</Text>
        <Text style={styles.price}>{count}</Text>
      </View>
      <View style={styles.totals}>
        <Text style={styles.subtitle}>{gettext('Total price')}</Text>
        <Text style={styles.subtitle}>:</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  )
}
