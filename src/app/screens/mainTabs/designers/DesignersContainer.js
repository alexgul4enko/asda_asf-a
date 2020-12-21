import DesignersView from './DesignersView'
import DESIGNERS from './designers.graphql'
import { useCallback } from 'react'
import { useGraphInifnyList, useSearch, usePrefetchQuery } from '@cranium/resource'
import useGender from 'common/hooks/useGender'


export default function DesignersContainer(props) {
  const designers = usePrefetchQuery(DESIGNERS, { parseValue: 'data.designers' })({ first: 16 })
  useGender(designers)

  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(designers)
  const onSearch = useSearch(designers.request)
  const handleSearch = useCallback((search) => onSearch({ first: 16, search }), [onSearch])
  return (
    <DesignersView
      {...props}
      isLoading={designers.isLoading && designers.data === undefined}
      data={designers.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
      onSearch={handleSearch}
    />
  )
}
