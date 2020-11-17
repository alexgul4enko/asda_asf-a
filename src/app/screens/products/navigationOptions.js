import UserPick from 'common/navigation/userPick'
import get from 'lodash/get'
import parseSlug from 'common/utils/parseSlug'

export default function({ route }) {
  return {
    title: get(route, 'params.slug') ? parseSlug(route.params.slug) : gettext('Search'),
    headerRight: () => <UserPick/>,
  }
}
