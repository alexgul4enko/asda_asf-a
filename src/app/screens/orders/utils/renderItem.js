import Order from '../widgets/order'

export default function renderItem({ item }) {
  return <Order {...item.node}/>
}
