import Product from '../../product'

export default function renderItem({ item }) {
  return <Product {...item.node} hideLikeButton linkAction="push"/>
}
