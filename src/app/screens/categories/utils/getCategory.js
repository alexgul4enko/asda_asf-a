import CATEGORIES from '../categories.graphql'
import SUB_CATEGORIES from '../subCategories.graphql'
import { usePrefetchQuery } from '@cranium/resource'
import get from 'lodash/get'


export default function getCategory(variables) {
  if(!variables.parent) {
    return usePrefetchQuery(CATEGORIES, { parseValue: 'data.categories' })({ first: 20, ...variables })
  }
  return usePrefetchQuery(SUB_CATEGORIES, { parseValue: 'data.category.children', namespace: get(variables, 'title').replace(/\s/g, '') })({ first: 20, ...variables })
}