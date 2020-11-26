import NavigationPropTypes from 'common/prop-types/Navigation'
import { useCallback, useMemo, useEffect } from 'react'
import { useGraphInifnyList, useSearch, usePrefetchQuery } from '@cranium/resource'
import ProductsView from './ProductsView'
import analytics from '@react-native-firebase/analytics'
import get from 'lodash/get'
import idFromSlug from 'common/utils/idFromSlug'
import PRODUCTS from './products.graphql'


ProductsContainer.propTypes = NavigationPropTypes

export default function ProductsContainer({ isVip, ...props }) {
  useEffect(() => {
    analytics().logEvent(
      get(props, 'route.params.type') === 'category' ? 'view_category' : 'view_collection',
      get(props, 'route.params')
    )
  }, [])
  const filter = useMemo(() => {
    const type = get(props, 'route.params.type') === 'category' ? 'categories' : 'collections'
    const slug = get(props, 'route.params.slug')
    const id = idFromSlug(slug, get(props, 'route.params.type') === 'category' ? 'Category' : 'Collection')
    return {
      [type]: [id].filter(Boolean),
      isVip,
    }
  }, [props.route.params, isVip])
  const products = usePrefetchQuery(PRODUCTS, { parseValue: 'data.products' })({ first: 16, filter })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(products)
  const onSearch = useSearch(products.request)

  const handleSearch = useCallback((search) => {
    onSearch({ first: 16, filter: { ...filter, search } })
  }, [filter, onSearch])

  return (
    <ProductsView
      {...props}
      isLoading={products.initialLoading}
      data={products.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
      onSearch={handleSearch}
      filter={onSearch}
    />
  )
}
