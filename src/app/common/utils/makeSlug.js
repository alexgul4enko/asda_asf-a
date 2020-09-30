import kebabCase from 'lodash/kebabCase'
import { decode } from 'base-64'

export default function makeSlug(name, id) {
  if(!name || !id) {
    return
  }
  return `${kebabCase(name)}-${decode(id).split(':').pop()}`
}
