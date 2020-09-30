import parseSlug from 'common/utils/parseSlug'
import get from 'lodash/get'

export default function({ route }) {
  return {
    title: get(route, 'params.slug') ? parseSlug(route.params.slug) : 'Search',
  }
}
