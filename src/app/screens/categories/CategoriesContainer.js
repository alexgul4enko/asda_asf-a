import CategoriesView from './CategoriesView'
import CATEGORIES from './categories.graphql'
import useInfinityList from 'common/hooks/useInfinityList'
import isEmpty from 'lodash/isEmpty'

export default function CategoriesContainer(props) {
  const variables = isEmpty(props.route.params) ? { level: 0 } : props.route.params
  const { loading, data, loadNext, refetch, refreshing } = useInfinityList(CATEGORIES, 'categories', {
    variables: { first: 10, ...variables },
  })
  return (
    <CategoriesView
      {...props}
      loading={loading}
      data={data}
      loadNext={loadNext}
      refetch={refetch}
      refreshing={refreshing}
    />
  )
}
