import CelebrityView from './CelebrityView'
import { useMemo, useCallback, useEffect } from 'react'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import get from 'lodash/get'
import analytics from '@react-native-firebase/analytics'
import idFromSlug from 'common/utils/idFromSlug'
import SELEBRITY from './selebrity.graphql'
import CELEBRITYPRODUCTS from './selebrityProducts.graphql'


export default function CelebrityContainer(props) {
  useEffect(() => {
    analytics().logEvent('view_celeprity', get(props, 'route.params'))
  }, [])
  const id = useMemo(() => idFromSlug(get(props, 'route.params.slug')), [get(props, 'route.params.slug')])
  const celebrity = usePrefetchQuery(SELEBRITY, { parseValue: 'data.celebrity' })({ id })
  const products = usePrefetchQuery(CELEBRITYPRODUCTS, { parseValue: 'data.products' })({ first: 16, id })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(products)
  const onRefresh = useCallback(() => {
    refresh()
    celebrity.request({ id }, { reducer: 'replace' })
  }, [refresh, celebrity.request])

  return (
    <CelebrityView
      {...props}
      isLoading={celebrity.initialLoading}
      celebrity={celebrity.data}
      products={products.data}
      loadNext={loadNext}
      refetch={onRefresh}
      refreshing={isRefreshing}
    />
  )
}
