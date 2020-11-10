import get from 'lodash/get'

export default function parseValue(val) {
  return get(val, 'data.me.checkout', {}) || {}
}
