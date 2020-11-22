import notifee from '@notifee/react-native'
import get from 'lodash/get'
import theme from 'theme'

export default function handleNotification(remoteMessage) {
  const largeIcon = get(remoteMessage, 'data.fcm_options.image',) || get(remoteMessage, 'notification.android.imageUrl')
  const url = get(remoteMessage, 'data.url')
  const ios = largeIcon ? {
    attachments: [{ url: largeIcon }],
  } : undefined
  const data = url ? { url } : undefined
  notifee.displayNotification({
    ...remoteMessage.notification,
    ios,
    data,
    android: {
      channelId: 'wecre8',
      color: theme.primary,
      ...(largeIcon ? { largeIcon } : {}),
      smallIcon: 'ic_notif',
      ...(get(remoteMessage, 'notification.android.sound') ? {
        sound: get(remoteMessage, 'notification.android.sound'),
      } : {}),
    },
  })
}
