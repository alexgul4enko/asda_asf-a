import Product from 'common/widgets/product'

export default function renderItem({ item }) {
  return <Product {...item.node} to="Celebrity"/>
}
