import Product from 'common/widgets/product'
import reducer from 'common/widgets/product/utils/reducer'

const options = { namespace: 'getUserDigitalContent', reducer }
export default function renderItem({ item }) {
  return <Product {...item.node} options={options}/>
}
