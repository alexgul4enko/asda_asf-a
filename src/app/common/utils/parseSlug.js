import capitalize from 'lodash/capitalize'

export default function parseSlug(slug) {
  if(!slug) {
    return
  }
  return slug.split('-').slice(0, 2).map(capitalize).join(' ')
}
