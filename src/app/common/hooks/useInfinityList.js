import { useQuery } from '@apollo/client'
import { useCache } from 'common/cache'
import { useCallback, useEffect } from 'react'
import get from 'lodash/get'
import omit from 'lodash/omit'

const defaultConfigs = {
  variables: { first: 3 },
}

export default function useInfinityList(query, dataPrefix, configs = defaultConfigs) {
  const { gender } = useCache()

  const { data, loading, error, fetchMore, refetch, networkStatus, variables } = useQuery(query, configs)
  useEffect(() => { refetch && refetch() }, [gender])
  const loadNext = useCallback(() => {
    if(!data) { return }
    if(get(data, `${dataPrefix}.totalCount`) <= get(data, `${dataPrefix}.edges.length`)) {
      return
    }
    fetchMore({
      variables: {
        ...omit(variables, 'first'),
        cursor: get(data, `${dataPrefix}.pageInfo.endCursor`),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          [dataPrefix]: {
            ...get(prev, dataPrefix),
            ...get(fetchMoreResult, dataPrefix),
            edges: [
              ...get(prev, (`${dataPrefix}.edges`)),
              ...get(fetchMoreResult, (`${dataPrefix}.edges`)),
            ],
          },
        }
      },
    })
  }, [fetchMore, data, variables])
  return {
    loading,
    data: get(data, `${dataPrefix}.edges`),
    loadNext,
    refetch,
    refreshing: networkStatus === 4,
  }
}
