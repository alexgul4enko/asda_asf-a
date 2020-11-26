import DesignerView from './DesignerView'
import { useMemo, useCallback, useEffect } from 'react'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import get from 'lodash/get'
import analytics from '@react-native-firebase/analytics'
import idFromSlug from 'common/utils/idFromSlug'
import DESIGNER from './designer.graphql'
import DESIGNERPRODUCTS from './designerProducts.graphql'


export default function DesignerContainer(props) {
  useEffect(() => {
    analytics().logEvent('view_celeprity', get(props, 'route.params'))
  }, [])
  const id = useMemo(() => idFromSlug(get(props, 'route.params.slug')), [get(props, 'route.params.slug')])
  const designer = usePrefetchQuery(DESIGNER, { parseValue: 'data.designer' })({ id })
  const products = usePrefetchQuery(DESIGNERPRODUCTS, { parseValue: 'data.products' })({ first: 16, id })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(products)
  const onRefresh = useCallback(() => {
    refresh()
    designer.request({ id }, { reducer: 'replace' })
  }, [refresh, designer.request])

  return (
    <DesignerView
      {...props}
      isLoading={designer.initialLoading}
      designer={designer.data}
      products={products.data}
      loadNext={loadNext}
      refetch={onRefresh}
      refreshing={isRefreshing}
    />
  )
}
