import OrdersView from './OrdersView'
import ORDERS from './orders.graphql'
import { useGraphInifnyList, usePrefetchQuery } from '@cranium/resource'


export default function OrdersContainer() {
  const orders = usePrefetchQuery(ORDERS, { parseValue: 'data.me.orders' })({ first: 16 })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(orders)

  return (
    <OrdersView
      isLoading={orders.initialLoading}
      data={orders.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
