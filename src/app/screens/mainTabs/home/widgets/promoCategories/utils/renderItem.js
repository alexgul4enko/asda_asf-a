import Category from '../widgets/category'

export default function renderItem({ item }, type) {
  return <Category {...item.node} type={type}/>
}
