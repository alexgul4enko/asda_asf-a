import Header from './Header'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { usePrefetchQuery } from '@cranium/resource'
import { useRoute } from '@react-navigation/native'
import CATEGORY from './category.graphql'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

export default function HeaderContainer() {
  const route = useRoute()
  const slug = useMemo(() => get(route, 'params.slug'), [get(route, 'params.slug')])
  const category = usePrefetchQuery(CATEGORY, { parseValue: 'data.category.children' })({ slug, first: 16 })
  const price = useSelector(state => get(state, 'productsCount.filters.filter.price', {}))
  const categories = useSelector(state => get(state, 'productsCount.filters.filter.categorySlugs', []))
  const priceText = useMemo(() => {
    if(isEmpty(price)) { return null }
    return [price.gte || 0, price.lte || '...'].join(' - ')
  }, [price])

  const categoryFilters = useMemo(() => {
    if((categories || []).includes(slug)) {
      return []
    }
    return categories
  }, [slug, categories])

  return (
    <Header
      priceText={priceText}
      hasSubCategories={!!get(category, 'data.totalCount')}
      categoryFilters={categoryFilters}
    />
  )
}
