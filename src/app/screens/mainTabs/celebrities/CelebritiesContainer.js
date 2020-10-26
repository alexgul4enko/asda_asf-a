import CelebritiesView from './CelebritiesView'
import { useCallback } from 'react'
import { useGraphInifnyList, useSearch, usePrefetchQuery } from '@cranium/resource'
import useGender from 'common/hooks/useGender'
import CELEBRITY from './celebrities.graphql'

export default function CelebritiesContainer(props) {
  const celebrities = usePrefetchQuery(CELEBRITY, { parseValue: 'data.celebrities' })({ first: 16 })
  useGender(celebrities)
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(celebrities)
  const onSearch = useSearch(celebrities.request)
  const handleSearch = useCallback((search) => onSearch({ first: 16, search }), [onSearch])

  return (
    <CelebritiesView
      {...props}
      isLoading={celebrities.isLoading && celebrities.data === undefined}
      data={celebrities.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
      onSearch={handleSearch}
    />
  )
}
