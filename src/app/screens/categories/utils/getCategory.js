import SUB_CATEGORIES from '../subCategories.graphql'
import { usePrefetchQuery } from '@cranium/resource'
import get from 'lodash/get'


export default function getCategory(variables) {
  return usePrefetchQuery(SUB_CATEGORIES, {
    parseValue: 'data.category.children',
    namespace: get(variables, 'key').replace(/\s/g, ''),
  })({ first: 20, ...variables })
}
