import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

export default function parseValue(value) {
  if(isEmpty(get(value, 'data'))) { return [] }
  return {
    edges: Object.values(value.data).map(node => ({ node })),
  }
}
