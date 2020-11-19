import notifee from '@notifee/react-native'
import get from 'lodash/get'

export default function handleNotification(remoteMessage) {
  const largeIcon = get(remoteMessage, 'data.fcm_options.image')
  const url = get(remoteMessage, 'data.url')
  const ios = largeIcon ? {
    attachments: [{ url: largeIcon }],
  } : undefined
  const data = url ? { url } : undefined
  notifee.displayNotification({
    ...remoteMessage.notification,
    ios,
    data,
  })
}
