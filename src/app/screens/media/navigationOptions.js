import UserPick from 'common/navigation/userPick'

export default function({ route }) {
  return {
    title: gettext('Media'),
    headerRight: () => <UserPick/>,
  }
}
