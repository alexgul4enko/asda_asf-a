import capitalize from 'lodash/capitalize'

export default function parseSlug(slug) {
  if(!slug) {
    return
  }
  if(slug.startsWith('-')) {
    return
  }
  return slug.split('-').slice(0, -1).map(capitalize).join(' ')
}
