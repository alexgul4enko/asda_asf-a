import { useSelector } from 'react-redux'
import { useSetData } from '@cranium/resource'
import { useCallback } from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import ADD from './add.graphql'
import UPDATE from './update.graphql'

export default function useAddtoBag({ data, request }) {
  const bag = useSelector(state => get(state, 'bag.data'))
  const setBag = useSetData('bag')


  return useCallback((card, setActive) => {
    if(isEmpty(card)) { return }
    if(get(data, 'id')) {
      if(Array.isArray(get(data, 'lines')) && data.lines.findIndex(({ variant }) => variant.id === card.id) === -1) {
        return request({
          checkoutId: data.id,
          lines: [{
            variantId: card.id,
            quantity: card.quantity,
          }],
        }, {
          query: ADD,
          parseValue: 'data.checkoutLinesAdd.checkout',
          parseErrors: 'data.checkoutLinesAdd.checkoutErrors',
          reducer: 'object',
        })
      }

      return request({
        checkoutId: data.id,
        lines: data.lines.map((item) => {
          if(item.variant.id === card.id) {
            return {
              variantId: card.id,
              quantity: item.quantity + card.quantity,
            }
          }
          return {
            variantId: item.variant.id,
            quantity: item.quantity,
          }
        }),
      }, {
        query: UPDATE,
        parseValue: 'data.checkoutLinesUpdate.checkout',
        parseErrors: 'data.checkoutLinesUpdate.checkoutErrors',
        reducer: 'object',
      })
    }
    if(isEmpty(bag) || !Array.isArray(bag)) {
      return setBag([card])
    }
    if(bag.findIndex(({ id }) => id === card.id) > -1) {
      return setBag(bag.map((bagItem) => {
        if(bagItem.id === card.id) {
          return {
            ...bagItem,
            quantity: bagItem.quantity + card.quantity,
          }
        }
        return bagItem
      }))
    }
    return setBag([...bag, card])
  }, [setBag, bag, data, request])
}
