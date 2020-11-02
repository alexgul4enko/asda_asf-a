import NavigationPropTypes from 'common/prop-types/Navigation'
import ProductView from './ProductView'
import { usePrefetchQuery } from '@cranium/resource'
import { useMemo } from 'react'
import idFromSlug from 'common/utils/idFromSlug'
import get from 'lodash/get'
import PRODUCT from './product.graphql'

ProductContainer.propTypes = NavigationPropTypes

export default function ProductContainer({ route }) {
  const id = useMemo(() => idFromSlug(get(route, 'params.slug'), 'Product'), [get(route, 'params.slug')])
  const product = usePrefetchQuery(PRODUCT, { parseValue: 'data.product' })({ id })
  return (
    <ProductView
      {...product.data}
    />
  )
}
