import PropTypes from 'prop-types'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useRoute } from '@react-navigation/native'
import get from 'lodash/get'
import idFromSlug from 'common/utils/idFromSlug'
import isEmpty from 'lodash/isEmpty'


HeaderContainer.propTypes = {
  category: PropTypes.object,
  userData: PropTypes.object,
}

HeaderContainer.defaultProps = {
  category: undefined,
  userData: undefined,
}

export default function HeaderContainer({ category, userData }) {
  const route = useRoute()
  const id = useMemo(() => {
    return idFromSlug(get(route, 'params.slug'), 'Category')
  }, [get(route, 'params.slug')])

  const price = useSelector(state => get(state, 'productsCount.filters.filter.price', {}))
  const categories = useSelector(state => get(state, 'productsCount.filters.filter.categories', []))
  const priceText = useMemo(() => {
    if(isEmpty(price)) { return null }
    return [price.gte || 0, price.lte || '...'].join(' - ')
  }, [price])

  const categoryFilters = useMemo(() => {
    if((categories || []).includes(id)) {
      return []
    }
    const set = new Set(categories)
    return get(category, 'data.edges', [])
      .filter(({ node }) => set.has(node.id))
      .map(({ node }) => get(node, 'translation.name', node.name))
  }, [id, categories, category])

  return (
    <Header
      priceText={priceText}
      hasSubCategories={!!get(category, 'data.totalCount')}
      categoryFilters={categoryFilters}
      userData={userData}
    />
  )
}
