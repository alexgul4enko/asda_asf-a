import Product from '../widgets/product'

export default function renderItem({ item }) {
  return (<Product {...item}/>)
}
