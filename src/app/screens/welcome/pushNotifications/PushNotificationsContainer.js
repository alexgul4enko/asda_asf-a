import { useCallback } from 'react'
import { useTranslations } from '@cranium/i18n'
import { useSetData } from '@cranium/resource'
import PushNotificationsView from './PushNotificationsView'
import registerPushNotifications from 'common/utils/pushNotifications'


export default function PushNotificationsContainer() {
  const { gettext } = useTranslations()
  const setAppSettings = useSetData('app')
  const setupNotification = useCallback(() => {
    registerPushNotifications(gettext)

      .finally(() => {
        setAppSettings('done')
      })
  }, [gettext, setAppSettings])
  const skip = useCallback(() => setAppSettings('done'), [setAppSettings])
  return (
    <PushNotificationsView skip={skip} setupNotification={setupNotification}/>
  )
}
