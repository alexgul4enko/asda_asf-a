import NavigationPropTypes from 'common/prop-types/Navigation'
import Card from './widgets/card'
import BagView from './BagView'
import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import { I18nManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import analytics from '@react-native-firebase/analytics'
import { usePrefetchQuery, useGraphInifnyList, useClear } from '@cranium/resource'
import { hasPermission } from '@cranium/access'
import { access } from 'common/session'
import get from 'lodash/get'
import useDeleteItem from './utils/useDeleteItem'
import useUpdateCount from './utils/useUpdateCount'
import parseValue from './utils/parseValue'
import createChecoutData from './utils/createChecoutData'
import CHECKOUT from './checkout.graphql'
import CREATE from './create.graphql'
import ME from './me.graphql'

BagContainer.propTypes = NavigationPropTypes

export default function BagContainer({ navigation }) {
  const checkoutList = usePrefetchQuery(CHECKOUT, { parseValue })({})

  const me = usePrefetchQuery(ME, { parseValue: 'data.me' })({})
  const bag = useSelector(state => get(state, 'bag.data'))
  const clearBag = useClear('bag')
  const { refresh, isRefreshing } = useGraphInifnyList(checkoutList)
  const deleteItem = useDeleteItem(checkoutList)
  const updateCount = useUpdateCount(checkoutList)
  const isLoggedIn = hasPermission(access.F_PROTECTED)
  useFocusEffect(
    useCallback(() => {
      if(checkoutList.initialLoading) {
        return
      }
      checkoutList.request({})
      me.request({})
    }, [])
  )

  const renderItem = useCallback(({ item }) => {
    return (
      <Card
        {...item}
        deleteItem={deleteItem}
        updateCount={updateCount}
      />
    )
  }, [deleteItem, updateCount])

  const data = useMemo(() => {
    if(checkoutList.initialLoading) {
      return
    }
    return get(checkoutList, 'data.id') ? get(checkoutList, 'data.lines', []) : bag
  }, [checkoutList.initialLoading, get(checkoutList, 'data.lines'), bag])

  const totals = useMemo(() => {
    if(get(checkoutList, 'data.id')) {
      const shipping = get(checkoutList, 'data.shippingPrice.gross.amount') || 0

      const total = get(checkoutList, 'data.totalPrice.gross.amount') || 0
      const checkoutTotalPrice = I18nManager.isRTL
        ? [get(checkoutList, 'data.subtotalPrice.currency'), (shipping + total).toLocaleString()].reverse().join(' ')
        : [get(checkoutList, 'data.subtotalPrice.currency'), (shipping + total).toLocaleString()].join(' ')
      const checkoutCount = get(checkoutList, 'data.lines', []).length
      return {
        count: checkoutCount,
        price: checkoutTotalPrice,
      }
    }
    const totalPrice = (bag || []).reduce((res, { variant, quantity }) => {
      return res + get(variant, 'pricing.price.net.amount', 0) * quantity
    }, 0)
    const totalPriceCurrency = get(bag, '[0]variant.pricing.price.currency')
    return {
      count: (bag || []).length,
      price: I18nManager.isRTL ? [totalPriceCurrency, totalPrice.toLocaleString()].reverse().join(' ') : [totalPriceCurrency, totalPrice.toLocaleString()].join(' '),
    }
  }, [bag, checkoutList.data])

  const proceed = useCallback(() => {
    if(!isLoggedIn) {
      return navigation.navigate('Login')
    }

    if(get(checkoutList, 'data.id')) {
      return navigation.navigate('Checkout')
    }
    analytics().logBeginCheckout()
    const input = createChecoutData(bag, me.data)
    return checkoutList.request({ input }, {
      query: CREATE,
      parseValue: 'data.checkoutCreate',
      parseErrors: 'data.checkoutCreate.checkoutErrors',
      reducer: 'none',
    })
      .then(errors => {
        checkoutList.request()
        clearBag()
        navigation.navigate('Checkout')
      })
  }, [
    clearBag,
    isLoggedIn,
    get(checkoutList, 'data.id'),
    checkoutList.request,
    bag,
    me.data,
  ])


  return (
    <BagView
      isLoading={checkoutList.initialLoading}
      data={data}
      refetch={refresh}
      refreshing={isRefreshing}
      renderItem={renderItem}
      totals={totals}
      proceed={proceed}
      errors={checkoutList.errors}
    />
  )
}
