import PropTypes from 'prop-types'
import { useGraphInifnyList } from '@cranium/resource'
import CategoriesView from './CategoriesView'
import useGender from 'common/hooks/useGender'
import getCategory from './utils/getCategory'
import isEmpty from 'lodash/isEmpty'

CategoriesContainer.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
}

export default function CategoriesContainer(props) {
  const variables = isEmpty(props.route.params) ? { level: 0 } : props.route.params
  const categories = getCategory(variables)
  useGender(categories)
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(categories)
  return (
    <CategoriesView
      {...props}
      isLoading={categories.isLoading && categories.data === undefined}
      data={categories.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
