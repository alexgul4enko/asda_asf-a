import Category from '../widgets/Category'

export default function renderItem({ item }) {
  return <Category {...item.node}/>
}
