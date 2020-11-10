import get from 'lodash/get'

export default function getVariants(variants, totalQuantity) {
  if(!totalQuantity) {
    return []
  }
  if(!Array.isArray(variants)) {
    return []
  }
  return Object.values(variants.filter(({ quantityAvailable }) => Boolean(quantityAvailable))
    .reduce((acc, { attributes }) => {
      if(!Array.isArray(attributes)) {
        return acc
      }
      return attributes.reduce((res, { attribute, values }) => {
        if(!get(res, attribute.id)) {
          return {
            ...res,
            [attribute.id]: {
              ...attribute,
              values,
            },
          }
        }
        const ids_ = new Set(values.map(({ id }) => id))
        const vals = get(get(res, attribute.id), 'values').filter(({ id }) => !ids_.has(id))
        return {
          ...res,
          [attribute.id]: {
            ...get(res, attribute.id),
            values: [...values, ...vals],
          },
        }
      }, acc)
    }, {})
  )
}
