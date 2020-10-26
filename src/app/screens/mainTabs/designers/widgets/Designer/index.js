import Designer from './Designer'

export default function renderItem({ item }) {
  return <Designer {...item.node}/>
}
