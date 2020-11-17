import PropTypes from 'prop-types'
import { Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import styles from './item.styles'

Item.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.node,
  filtersData: PropTypes.node,
  count: PropTypes.number,
}

Item.defaultProps = {
  title: undefined,
  filtersData: undefined,
  count: undefined,
}

export default function Item({ to, title, filtersData, count }) {
  return (
    <Link to={to} style={styles.link}>
      <Text style={styles.text}>{title} {count ? `(${count})` : null}</Text>
      <Text
        numberOfLines={1}
        allowFontScaling={false}
        ellipsizeMode="tail"
        style={styles.selection}
      >
        {filtersData}
      </Text>
      <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={24}/>
    </Link>
  )
}
