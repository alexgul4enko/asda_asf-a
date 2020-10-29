import get from 'lodash/get'

export default function reducer(prev, next) {
  const id = get(next, 'data.product.id')
  const inWishlist = get(next, 'data.product.inWishlist')
  return {
    ...prev,
    edges: get(prev, 'edges', []).map((item) => {
      if(get(item, 'node.id') === id) {
        return {
          node: {
            ...item.node,
            inWishlist,
          },
        }
      }
      return item
    }),
  }
}
