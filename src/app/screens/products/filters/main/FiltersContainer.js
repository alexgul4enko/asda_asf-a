import NavigationPropTypes from 'common/prop-types/Navigation'
import FiltersView from './FiltersView'
import Clear from '../clear'
import { useSelector } from 'react-redux'
import { usePrefetchQuery, useQuery } from '@cranium/resource'
import { useLayoutEffect, useCallback, useMemo } from 'react'
import get from 'lodash/get'
import omit from 'lodash/omit'
import idFromSlug from 'common/utils/idFromSlug'
import ATTRIBUTES from './attributes.graphql'
import ISVIP from './vip.graphql'
import PRODUCTS from './products.graphql'
import CATEGORY from './category.graphql'
import ALLPRODUCTS from '../../products.graphql'

ProductsContainer.propTypes = NavigationPropTypes

export default function ProductsContainer({ route, navigation }) {
  const id = useMemo(() => {
    return idFromSlug(get(route, 'params.slug'), 'Category')
  }, [get(route, 'params.slug')])
  const isVip = useSelector(state => get(state, 'isVipUser.data.me.isVip') ? undefined : false)
  const filter = useMemo(() => {
    const type = get(route, 'params.type') === 'category' ? 'inCategory' : 'inCollection'
    const slug = get(route, 'params.slug')
    const id = idFromSlug(slug, get(route, 'params.type') === 'category' ? 'Category' : 'Collection')
    return {
      [type]: id,
    }
  }, [route.params])
  const { data: userData, initialLoading: vipLoading } = usePrefetchQuery(ISVIP, { parseValue: 'data.me' })()
  const category = usePrefetchQuery(CATEGORY, { parseValue: 'data.category.children' })({ id, first: 16 })
  const attributes = usePrefetchQuery(ATTRIBUTES, { parseValue: 'data.attributes' })({ filter })

  const filters = useSelector(state => omit(get(state, 'products.filters'), ['first', 'cursor', 'sortBy']))
  const products = usePrefetchQuery(PRODUCTS, { parseValue: 'data.products' })(filters)
  const allproducts = useQuery(ALLPRODUCTS, { parseValue: 'data.products', queries: ['filter', 'offset'] })
  const clear = useCallback(() => {
    const type = get(route, 'params.type') === 'category' ? 'categories' : 'collections'
    const slug = get(route, 'params.slug')
    const id = idFromSlug(slug, get(route, 'params.type') === 'category' ? 'Category' : 'Collection')
    const filter = {
      [type]: [id].filter(Boolean),
      isVip,
    }
    products.request({ filter })
    allproducts.request({ filter, first: 16 })
    navigation.pop()
  }, [get(route, 'params'), products.request, isVip, navigation.pop, allproducts.request])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Clear clear={clear}/>),
    })
  }, [navigation, clear])

  return (
    <FiltersView
      data={attributes.data}
      isLoading={attributes.initialLoading || vipLoading || category.initialLoading }
      category={category}
      userData={userData}
    />
  )
}
