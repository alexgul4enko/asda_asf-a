import PropTypes from 'prop-types'
import { useGraphInifnyList } from '@cranium/resource'
import CategoriesView from './CategoriesView'
import useGender from 'common/hooks/useGender'
import getCategory from './utils/getCategory'

CategoriesContainer.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
    key: PropTypes.string,
  }).isRequired,
}

export default function CategoriesContainer(props) {
  const categories = getCategory({ ...props.route.params, key: props.route.key })
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
