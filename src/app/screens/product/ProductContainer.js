import NavigationPropTypes from 'common/prop-types/Navigation'
import ProductView from './ProductView'
import { useSelector } from 'react-redux'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import { useMemo, useState, useEffect } from 'react'
import idFromSlug from 'common/utils/idFromSlug'
import markAsViewed from './utils/markAsViewed'
import analytics from '@react-native-firebase/analytics'
import get from 'lodash/get'
import PRODUCT from './product.graphql'

ProductContainer.propTypes = NavigationPropTypes

export default function ProductContainer({ route }) {
  useEffect(() => {
    analytics().logEvent('view_product', get(route, 'params'))
  }, [])
  const [variant, selectVariant] = useState({})
  const [count, setCount] = useState(1)
  const id = useMemo(() => idFromSlug(get(route, 'params.slug'), 'Product'), [get(route, 'params.slug')])
  const product = usePrefetchQuery(PRODUCT, { parseValue: 'data.product', namespace: route.key })({ id })

  const { refresh, isRefreshing } = useGraphInifnyList(product)
  markAsViewed(id)
  const submitError = useSelector(state => get(state, 'checkoutBag.errors'))
  return (
    <ProductView
      {...product.data}
      isLoading={product.initialLoading}
      refetch={refresh}
      refreshing={isRefreshing}
      namespace={route.key}
      selectVariant={selectVariant}
      variant={variant}
      count={count}
      setCount={setCount}
      submitError={submitError}
    />
  )
}
