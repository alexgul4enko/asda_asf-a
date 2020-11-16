import get from 'lodash/get'

export default function getFeeds() {
  return fetch('https://www.instagram.com/wecre8.sa/')
    .then(res => {
      const resText = res._bodyText.match(
        /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
      )[1].slice(0, -1)
      const respObj = JSON.parse(resText)
      return get(respObj, 'entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges', [])
    })
}
