import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Button from 'common/widgets/button'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import styles from './header.styles'
import theme from 'theme'

Header.propTypes = {
  order: PropTypes.func.isRequired,
  appliedFilters: PropTypes.node,
  params: PropTypes.object,
}

Header.defaultProps = {
  appliedFilters: undefined,
  params: undefined,
}

export default function Header({ order, appliedFilters, params }) {
  return (
    <View style={styles.header}>
      <Button
        style={[styles.btn, styles.sort]}
        onPress={order}
      >
        <Icon name="sort-01" color={theme.primary} size={14}/>
        <Text style={styles.title}>{gettext('SORT')}</Text>
      </Button>
      <Link
        style={styles.btn}
        params={params}
        to="Filters"
      >
        <Icon name="filter-01" color={theme.primary} size={14}/>
        <Text style={styles.title}>{gettext('FILTER')}</Text>
        <Text>{appliedFilters}</Text>
      </Link>
    </View>
  )
}
