import PropTypes from 'prop-types'
import RecentView from './RecentView'
import { usePrefetchQuery } from '@cranium/resource'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import makeQuery from './utils/makeQuery'
import parseValue from './utils/parseValue'
import get from 'lodash/get'

RecentContainer.propTypes = {
  namespace: PropTypes.string,
  id: PropTypes.string,
}

RecentContainer.defaultProps = {
  namespace: undefined,
  id: undefined,
}

export default function RecentContainer({ id, namespace }) {
  const filters = useSelector(state => get(state, 'recent.filters.ids'))
  const query = makeQuery(filters, id)
  const recent = usePrefetchQuery(query, { namespace: namespace, parseValue })()
  const recentList = useMemo(() => {
    if(Array.isArray(get(recent, 'data.edges'))) {
      return recent.data.edges.filter(({ node }) => Boolean(node))
    }
    return []
  }, [recent.data])
  return (
    <RecentView
      isLoading={recent.initialLoading}
      data={recentList}
    />
  )
}
