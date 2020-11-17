import PropTypes from 'prop-types'
import { usePrefetchQuery } from '@cranium/resource'
import useGender from 'common/hooks/useGender'
import PromoCategoriesView from './PromoCategoriesView'
import PROMOCATEGORiES from './promogategories.graphql'
import camelCase from 'lodash/camelCase'

PromoCategoriesContainer.propTypes = {
  type: PropTypes.oneOf(['TOP', 'POPULAR']).isRequired,
}

export default function PromoCategoriesContainer({ type }) {
  const categories = usePrefetchQuery(PROMOCATEGORiES, { parseValue: 'data.categories', namespace: camelCase(`${type}_categories`) })({ orderBy: type, direction: 'ASC' })

  useGender(categories)
  return (
    <PromoCategoriesView
      isLoading={categories.isLoading}
      data={categories.data}
      type={type}
    />
  )
}
