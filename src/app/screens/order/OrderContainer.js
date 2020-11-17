import NavigationPropTypes from 'common/prop-types/Navigation'
import OrderView from './OrderView'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import get from 'lodash/get'
import ORDER from './order.graphql'

OrderContainer.propTypes = NavigationPropTypes

export default function OrderContainer({ route }) {
  const order = usePrefetchQuery(ORDER, { parseValue: 'data.orderByToken' })({ first: 16, token: get(route, 'params.token') })
  const { refresh, isRefreshing } = useGraphInifnyList(order)

  return (
    <OrderView
      isLoading={order.initialLoading}
      {...order.data}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
