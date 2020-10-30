import { WishListProducts } from 'common/widgets/product'
import get from 'lodash/get'

export default function renderItem({ item }) {
  return <WishListProducts {...get(item, 'node.product', {})}/>
}
