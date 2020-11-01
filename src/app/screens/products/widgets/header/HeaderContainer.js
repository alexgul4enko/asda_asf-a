import PropTypes from 'prop-types'
import Header from './Header'
import useOrder from './useOrder'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { useMemo } from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

HeaderContainer.propTypes = {
  filter: PropTypes.func.isRequired,
}

export default function HeaderContainer({ filter }) {
  const order = useOrder(filter)
  const route = useRoute()
  const filters = useSelector(state => get(state, 'products.filters.filter', {}))

  const appliedFilters = useMemo(() => {
    const subCategories = get(filters, 'categorySlugs', []).filter(item => item !== get(route, 'params.slug'))

    const filtersCount = [
      subCategories.length,
      isEmpty(get(filters, 'price')) ? 0 : 1,
      ...get(filters, 'attributes', []).map(({ values }) => values.length),
    ].reduce((c, i) => c + i, 0)

    if(!filtersCount) { return null }
    return `(${filtersCount})`
  }, [filters, get(route, 'params.slug')])

  return (
    <Header
      order={order}
      appliedFilters={appliedFilters}
      params={route.params}
    />
  )
}
