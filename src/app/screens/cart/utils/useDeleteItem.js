import { useSelector } from 'react-redux'
import { useSetData } from '@cranium/resource'
import { useCallback } from 'react'
import get from 'lodash/get'
import DELETE from './delete.graphql'

export default function useDeleteItem({ data, request }) {
  const bag = useSelector(state => get(state, 'bag.data'))
  const setBag = useSetData('bag')
  return useCallback((id) => {
    if(get(data, 'id')) {
      return request({
        checkoutId: data.id,
        lineId: id,
      }, { query: DELETE, parseValue: 'data.checkoutLineDelete.checkout', reducer: 'object' })
    }
    return setBag(bag.filter(item => item.id !== id))
  }, [setBag, bag, data, request])
}
