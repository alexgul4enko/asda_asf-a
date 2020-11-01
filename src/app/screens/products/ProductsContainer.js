import NavigationPropTypes from 'common/prop-types/Navigation'
import { useCallback, useMemo } from 'react'
import { useGraphInifnyList, useSearch, usePrefetchQuery } from '@cranium/resource'
import ProductsView from './ProductsView'
import get from 'lodash/get'
import PRODUCTS from './products.graphql'


ProductsContainer.propTypes = NavigationPropTypes

export default function ProductsContainer(props) {
  const filter = useMemo(() => ({
    categorySlugs: [get(props, 'route.params.slug')].filter(Boolean),
  }), [props.route.params])

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
