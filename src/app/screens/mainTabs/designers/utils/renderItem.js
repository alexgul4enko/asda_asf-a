import UserCard from 'common/widgets/userCard'

export default function renderItem({ item }) {
  return <UserCard {...item.node} to="Designer"/>
}
