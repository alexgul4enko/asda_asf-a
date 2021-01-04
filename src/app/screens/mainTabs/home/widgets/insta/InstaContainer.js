import getFeeds from './utils/getFeeds'
import { useEffect, useState, Fragment, useCallback } from 'react'
import WebView from 'react-native-webview'
import { Platform } from 'react-native'
import InstaView from './InstaView'
import get from 'lodash/get'


const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window._sharedData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges));
})();`

const source = { uri: 'https://www.instagram.com/wecre8.sa' }
const style = { display: 'none' }

export default function InstaContainer() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(Platform.OS === 'android') {
      return
    }
    getFeeds()
      .then(data => setData(data || []))
      .catch(err => console.log(err))
      .finally(_ => setLoading(false))
  }, [])

  const onMessage = useCallback((event) => {
    setData(get(event, 'nativeEvent.data') ? JSON.parse(get(event, 'nativeEvent.data')) || [] : [])
    setLoading(false)
  }, [])
  const onError = useCallback((event) => {
    setLoading(false)
  }, [])
  return (
    <Fragment>
      <InstaView
        data={data}
        isLoading={loading}
      />
      {
        Platform.OS === 'android' ? (
          <WebView
            source={source}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={onMessage}
            style={style}
            onError={onError}
          />
        ) : null
      }
    </Fragment>
  )
}
