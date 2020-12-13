import MediaView from './MediaView'
import { useEffect } from 'react'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import get from 'lodash/get'
import analytics from '@react-native-firebase/analytics'
import MEDIA from './media.graphql'

function parseValue(res) {
  return {
    ...get(res, 'data.userDigitalContent'),
    edges: (get(res, 'data.userDigitalContent.products') || []).map(node => ({ node })),
  }
}
export default function DesignerContainer(props) {
  useEffect(() => {
    analytics().logEvent('view_media_content', get(props, 'route.params'))
  }, [])


  const media = usePrefetchQuery(MEDIA, { parseValue })({ id: get(props, 'route.params.id') })
  const { refresh, isRefreshing } = useGraphInifnyList(media)


  return (
    <MediaView
      {...props}
      isLoading={media.initialLoading}
      products={media.data}
      refetch={refresh}
      refreshing={isRefreshing}
      media={get(props, 'route.params')}
    />
  )
}
