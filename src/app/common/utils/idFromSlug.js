import { encode } from 'base-64'

export default function idFromSlug(slug, prefix = 'User') {
  if(!slug) { return }
  const id = slug.split('-').pop()
  return encode(`${prefix}:${id}`)
}
