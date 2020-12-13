import SettingsView from './SettingsView'
import { Form } from 'react-final-form'
import Subscribe from './Subscribe'
import { useQuery } from '@cranium/resource'
import { useTranslations } from '@cranium/i18n'
import { useState, useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import registerPushNotifications from 'common/utils/pushNotifications'
import AsyncStorage from '@react-native-community/async-storage'
import SUBSCRIBE from './subscribe.graphql'
import parseValue from './utils/parseValue'
import validate from './utils/validate'
import toast from 'common/utils/toast'


export default function SettingsContainer() {
  const { gettext } = useTranslations()
  const [push, setPush] = useState(messaging().isDeviceRegisteredForRemoteMessages)
  const changePushNotifications = useCallback((value) => {
    if(value) {
      return registerPushNotifications(gettext)
        .finally(() => setPush(messaging().isDeviceRegisteredForRemoteMessages))
    }
    if(Platform.OS === 'ios') {
      messaging().unregisterDeviceForRemoteMessages()
        .finally(() => setPush(messaging().isDeviceRegisteredForRemoteMessages))
    }
    if(Platform.OS === 'android') {
      setPush(false)
    }
    return messaging().unsubscribeFromTopic('promo')
      .finally(_ => {
        AsyncStorage.setItem('promo_subscription', 'false')
      })
  }, [setPush])

  useEffect(() => {
    AsyncStorage.getItem('promo_subscription')
      .then(data => setPush(data === 'true'))
  }, [])

  const { request } = useQuery(SUBSCRIBE, { namespace: 'subscribe', parseValue })
  const handleSubmit = useCallback((variables) => {
    return request(variables)
      .then(() => toast({ title: gettext('Subscribed'), position: 'top' }))
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
