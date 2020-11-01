import parseSlug from 'common/utils/parseSlug'
import UserPick from 'common/navigation/userPick'

export default function({ route }) {
  return {
    title: parseSlug(route.params.slug),
    headerRight: () => <UserPick/>,
  }
}
