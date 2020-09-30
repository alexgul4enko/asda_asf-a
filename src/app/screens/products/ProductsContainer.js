import { useCallback } from 'react'
import ProductsView from './ProductsView'
import PRODUCTS from './products.graphql'
import useInfinityList from 'common/hooks/useInfinityList'
import isEmpty from 'lodash/isEmpty'


export default function ProductsContainer(props) {
  const variables = isEmpty(props.route.params) ? { slug: [] } : {
    slug: [props.route.params.slug],
  }
  const { loading, data, loadNext, refetch, refreshing } = useInfinityList(PRODUCTS, 'products', {
    variables: { first: 10, ...variables },
  })
  // TODO: pass this logic to Search Component
  const handleSearch = useCallback((search) => {
    refetch({ first: 10, ...variables, search })
  }, [refetch, variables])

  return (
    <ProductsView
      {...props}
      loading={loading}
      data={data}
      loadNext={loadNext}
      refetch={refetch}
      refreshing={refreshing}
      handleSearch={handleSearch}
    />
  )
}
