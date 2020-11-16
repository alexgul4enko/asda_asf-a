import Category from '../widgets/Category'

export default function renderItem({ item, section }) {
  return <Category {...item.node} type={section.type}/>
}
