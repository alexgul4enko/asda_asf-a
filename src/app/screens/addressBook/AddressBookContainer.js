import AddressBookView from './AddressBookView'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import ADDRESSES from './address.graphql'


export default function AddressBookContainer() {
  const addresses = usePrefetchQuery(ADDRESSES, { parseValue: 'data.me.addresses' })()
  const { refresh, isRefreshing } = useGraphInifnyList(addresses)
  return (
    <AddressBookView
      isLoading={addresses.initialLoading}
      data={addresses.data}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
