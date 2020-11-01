import Filter from '../widgets/filter'

export default function renderItem({ item }) {
  return (<Filter {...item.node}/>)
}
