import PropTypes from 'prop-types'
import { View } from 'react-native'
import Item from './Item'

Header.propTypes = {
  priceText: PropTypes.string,
  hasSubCategories: PropTypes.bool.isRequired,
  categoryFilters: PropTypes.array.isRequired,
}

Header.defaultProps = {
  priceText: undefined,
}

export default function Header({ priceText, hasSubCategories, categoryFilters }) {
  return (
    <View>
      {
        hasSubCategories ? (
          <Item
            to="CategoryFilter"
            title={gettext('Category')}
            count={categoryFilters.length}
            filtersData={categoryFilters.join(', ')}
          />
        ) : null
      }
      <Item
        to="Price"
        title={gettext('Price')}
        filtersData={priceText}
      />
    </View>
  )
}
