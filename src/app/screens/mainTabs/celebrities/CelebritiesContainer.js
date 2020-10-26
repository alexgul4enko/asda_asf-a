import CelebritiesView from './CelebritiesView'
import CELEBRITY from './celebrities.graphql'
import { useGraphInifnyList, useSearch, usePrefetchQuery } from '@cranium/resource'
import useGender from 'common/hooks/useGender'

export default function CelebritiesContainer(props) {
  const celebrities = usePrefetchQuery(CELEBRITY, { parseValue: 'data.celebrities' })({ first: 10 })
  useGender(celebrities)
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(celebrities)


  return (
    <CelebritiesView
      {...props}
      loading={celebrities.isLoading}
      data={celebrities.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
