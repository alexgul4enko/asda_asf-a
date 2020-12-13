import PropTypes from 'prop-types'
import { View } from 'react-native'
import Item from './Item'
import VIP from './VIP'
import { useRoute } from '@react-navigation/native'
import get from 'lodash/get'

Header.propTypes = {
  priceText: PropTypes.string,
  hasSubCategories: PropTypes.bool.isRequired,
  categoryFilters: PropTypes.array.isRequired,
}

Header.defaultProps = {
  priceText: undefined,
}

export default function Header({ priceText, hasSubCategories, categoryFilters }) {
  const route = useRoute()
  return (
    <View>
      {
        hasSubCategories && (get(route, 'params.type') !== 'collection') ? (
          <Item
            to="CategoryFilter"
            title={gettext('Category')}
            count={categoryFilters.length}
            filtersData={categoryFilters.join(', ')}
          />
        ) : null
      }
      <VIP/>
      <Item
        to="Price"
        title={gettext('Price')}
        filtersData={priceText}
      />
    </View>
  )
}
