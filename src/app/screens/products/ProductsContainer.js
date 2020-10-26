import { useCallback } from 'react'
import ProductsView from './ProductsView'
import PRODUCTS from './products.graphql'
import isEmpty from 'lodash/isEmpty'
import { useGraphInifnyList, useSearch, usePrefetchQuery } from '@cranium/resource'


export default function ProductsContainer(props) {
  const variables = isEmpty(props.route.params) ? { slug: [] } : {
    slug: [props.route.params.slug],
  }

  const products = usePrefetchQuery(PRODUCTS, { parseValue: 'data.products' })({ first: 3, ...variables })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(products)
  const onSearch = useSearch(products.request)

  // TODO: pass this logic to Search Component
  const handleSearch = useCallback((search) => {
    onSearch({ first: 10, ...variables, search })
  }, [variables, onSearch])

  return (
    <ProductsView
      {...props}
      loading={products.isLoading}
      data={products.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
      handleSearch={handleSearch}
    />
  )
}
