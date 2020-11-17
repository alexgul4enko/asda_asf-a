import PropTypes from 'prop-types'
import { useGraphInifnyList, usePrefetchQuery } from '@cranium/resource'
import { useMemo } from 'react'
import CategoriesView from './CategoriesView'
import useGender from 'common/hooks/useGender'
import CATEGORIES from './categories.graphql'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

CategoriesContainer.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
}

export default function CategoriesContainer(props) {
  const categories = usePrefetchQuery(CATEGORIES, { parseValue: 'data' })({ first: 20, level: 0 })

  useGender(categories)
  const data = useMemo(() => {
    const collection = get(categories, 'data.collections.edges')
    const categ = get(categories, 'data.categories.edges')
    return [
      {
        title: isEmpty(collection) ? null : gettext('Collections'),
        data: collection,
        type: 'collection',
      },
      {
        title: isEmpty(categ) ? null : gettext('Categories'),
        data: categ,
        type: 'category',
      },
    ].filter(({ data }) => !isEmpty(data))
  }, [categories.data])
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList({ ...categories, data: get(categories, 'data.categories') })
  return (
    <CategoriesView
      isLoading={categories.initialLoading}
      data={data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
