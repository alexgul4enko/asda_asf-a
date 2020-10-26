import CategoriesView from './CategoriesView'
import CATEGORIES from './categories.graphql'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { useEffect } from 'react'
import { Button, Text } from 'react-native'
import { useGraphInifnyList, usePrefetchQuery } from '@cranium/resource'
import useGender from 'common/hooks/useGender'


export default function CategoriesContainer(props) {
  const variables = isEmpty(props.route.params) ? { level: 0 } : props.route.params
  const categories = usePrefetchQuery(CATEGORIES, { parseValue: 'data.categories', namespace: get(variables, 'title') ? get(variables, 'title').replace(/\s/g, '') : undefined })({ first: 3, ...variables })
  useGender(categories)
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(categories)
  return (
    <CategoriesView
      {...props}
      loading={categories.isLoading}
      data={categories.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
