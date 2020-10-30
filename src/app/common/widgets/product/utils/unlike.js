import get from 'lodash/get'

export default function unlikeReducer(prev, id) {
  return {
    ...prev,
    edges: get(prev, 'edges', []).filter((item) => get(item, 'node.product.id') !== id),
  }
}
