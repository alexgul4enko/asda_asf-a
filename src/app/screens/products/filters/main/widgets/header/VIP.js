import { usePrefetchQuery, useQuery } from '@cranium/resource'
import ISVIP from './vip.graphql'
import get from 'lodash/get'
import { useCallback } from 'react'
import BoolInput from 'common/forms/inputs/boolInput'
import styles from './vip.styles'
import PRODUCTS from './products.graphql'

export default function VIP() {
  const { data } = usePrefetchQuery(ISVIP, { parseValue: 'data.me' })()

  const products = useQuery(PRODUCTS, { parseValue: 'data.products', destroyOnUnmount: false })

  const handleChange = useCallback((isVip) => {
    products.request({
      filter: {
        ...get(products, 'filters.filter', {}),
        isVip: isVip ? true : undefined,
      },
    })
  }, [products.request, get(products, 'filters.filter')])
  if(!get(data, 'isVip')) { return null }
  return (
    <BoolInput
      onChange={handleChange}
      text={gettext('Only VIP items')}
      style={styles.input}
      textStyle={styles.textStyle}
      value={!!get(products, 'filters.filter.isVip')}
    />
  )
}
