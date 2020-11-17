import FavouritesView from './FavouritesView'
import FAVOURITES from './favourites.graphql'
import { useGraphInifnyList, usePrefetchQuery } from '@cranium/resource'


export default function FavouritesContainer(props) {
  const favourites = usePrefetchQuery(FAVOURITES, { parseValue: 'data.me.wishlist' })({ first: 16 })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(favourites)

  return (
    <FavouritesView
      {...props}
      isLoading={favourites.initialLoading}
      data={favourites.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
