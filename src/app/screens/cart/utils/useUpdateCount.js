import { useSelector } from 'react-redux'
import { useSetData } from '@cranium/resource'
import { useCallback } from 'react'
import get from 'lodash/get'
import UPDATE from './update.graphql'

export default function useUpdateCount({ data, request }) {
  const bag = useSelector(state => get(state, 'bag.data'))

  const setBag = useSetData('bag')
  return useCallback((id, count) => {
    if(get(data, 'id')) {
      return request({
        checkoutId: data.id,
        lines: data.lines.map((item) => {
          if(item.id === id) {
            return {
              variantId: item.variant.id,
              quantity: count,
            }
          }
          return {
            variantId: item.variant.id,
            quantity: item.quantity,
          }
        }),
      }, { query: UPDATE, parseValue: 'data.checkoutLinesUpdate.checkout', reducer: 'object', parseErrors: 'data.checkoutLinesUpdate.checkoutErrors' })
    }
    return setBag(bag.map((item) => {
      if(item.id === id) {
        return {
          ...item,
          quantity: count,
        }
      }
      return item
    }))
  }, [setBag, bag, data, request])
}
