import SettingsView from './SettingsView'
import { Form } from 'react-final-form'
import Subscribe from './Subscribe'
import { useQuery } from '@cranium/resource'
import { useTranslations } from '@cranium/i18n'
import { useState, useCallback } from 'react'
import messaging from '@react-native-firebase/messaging'
import registerPushNotifications from 'common/utils/pushNotifications'
import SUBSCRIBE from './subscribe.graphql'
import parseValue from './utils/parseValue'
import validate from './utils/validate'


export default function SettingsContainer() {
  const { gettext } = useTranslations()
  const [push, setPush] = useState(messaging().isDeviceRegisteredForRemoteMessages)
  const changePushNotifications = useCallback((value) => {
    if(value) {
      return registerPushNotifications(gettext)
        .finally(() => setPush(messaging().isDeviceRegisteredForRemoteMessages))
    }
    messaging().unregisterDeviceForRemoteMessages()
      .finally(() => setPush(messaging().isDeviceRegisteredForRemoteMessages))
  }, [setPush])

  const { request } = useQuery(SUBSCRIBE, { namespace: 'subscribe', parseValue })
  const handleSubmit = useCallback((variables) => {
    return request(variables)
  }, [request])

  return (
    <SettingsView
      push={push}
      changePushNotifications={changePushNotifications}
    >
      <Form
        onSubmit={handleSubmit}
        render={Subscribe}
        validate={validate}
      />
    </SettingsView>
  )
}
