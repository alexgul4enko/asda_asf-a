import { encode } from 'base-64'

export default function idFromSlug(slug) {
  if(!slug) { return }
  const id = slug.split('-').pop()
  return encode(`User:${id}`)
}
