import NavigationPropTypes from 'common/prop-types/Navigation'
import FiltersView from './FiltersView'
import Clear from '../clear'
import { useSelector } from 'react-redux'
import { usePrefetchQuery } from '@cranium/resource'
import { useLayoutEffect, useCallback, useMemo } from 'react'
import get from 'lodash/get'
import omit from 'lodash/omit'
import ATTRIBUTES from './attributes.graphql'
import PRODUCTS from './products.graphql'

ProductsContainer.propTypes = NavigationPropTypes

export default function ProductsContainer({ route, navigation }) {
  const filter = useMemo(() => {
    const type = get(route, 'params.type') === 'category' ? 'inCategorySlug' : 'inCategorySlug'// 'inCollectionSlug'
    return {
      [type]: get(route, 'params.slug'),
    }
  }, [route.params])
  const attributes = usePrefetchQuery(ATTRIBUTES, { parseValue: 'data.attributes' })({ filter })
  const filters = useSelector(state => omit(get(state, 'products.filters'), ['first', 'cursor', 'sortBy']))
  const products = usePrefetchQuery(PRODUCTS, { parseValue: 'data.products' })(filters)
  const clear = useCallback(() => {
    products.request({ filter: { categorySlugs: [get(route, 'params.slug')] } })
  }, [get(route, 'params.slug'), products.request])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Clear clear={clear}/>),
    })
  }, [navigation, clear])

  return (
    <FiltersView
      data={attributes.data}
      isLoading={attributes.initialLoading}
    />
  )
}
