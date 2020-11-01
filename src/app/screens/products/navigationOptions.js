import UserPick from 'common/navigation/userPick'
import get from 'lodash/get'
import capitalize from 'lodash/capitalize'

export default function({ route }) {
  return {
    title: get(route, 'params.slug') ? capitalize(route.params.slug.split('-').join(' ')) : gettext('Search'),
    headerRight: () => <UserPick/>,
  }
}
