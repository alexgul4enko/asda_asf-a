import parseSlug from 'common/utils/parseSlug'

export default function({ route }) {
  return {
    title: parseSlug(route.params.slug),
  }
}
