import isEmpty from 'lodash/isEmpty'


export default function attributesFilter(prev, values, slug) {
  const attrs = (prev || []).filter(item => item.slug !== slug)
  if(isEmpty(values)) {
    return isEmpty(attrs) ? undefined : attrs
  }
  return [...attrs, { slug, values }]
}
