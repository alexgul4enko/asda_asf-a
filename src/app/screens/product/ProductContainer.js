import NavigationPropTypes from 'common/prop-types/Navigation'
import ProductView from './ProductView'
import { useSelector } from 'react-redux'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import { useMemo, useState } from 'react'
import idFromSlug from 'common/utils/idFromSlug'
import markAsViewed from './utils/markAsViewed'
import get from 'lodash/get'
import PRODUCT from './product.graphql'

ProductContainer.propTypes = NavigationPropTypes

export default function ProductContainer({ route }) {
  const [variant, selectVariant] = useState({})
  const [count, setCount] = useState(1)
  const id = useMemo(() => idFromSlug(get(route, 'params.slug'), 'Product'), [get(route, 'params.slug')])
  const product = usePrefetchQuery(PRODUCT, { parseValue: 'data.product', namespace: get(route, 'params.slug') })({ id })

  const { refresh, isRefreshing } = useGraphInifnyList(product)
  markAsViewed(id)
  const submitError = useSelector(state => get(state, 'checkoutBag.errors'))
  return (
    <ProductView
      {...product.data}
      isLoading={product.initialLoading}
      refetch={refresh}
      refreshing={isRefreshing}
      namespace={get(route, 'params.slug')}
      selectVariant={selectVariant}
      variant={variant}
      count={count}
      setCount={setCount}
      submitError={submitError}
    />
  )
}
