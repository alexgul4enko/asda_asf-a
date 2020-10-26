import { useCallback } from 'react'
import { useSetData } from '@cranium/resource'
import PushNotificationsView from './PushNotificationsView'
import messaging from '@react-native-firebase/messaging'
import { Platform, Alert, Linking, AppState } from 'react-native'
import iid from '@react-native-firebase/iid'
import { getUniqueId } from 'react-native-device-info'


function goToSettings() {
  return new Promise((res, rej) => {
    Alert.alert(
      'Enable push notifications from settings',
      null,
      [
        {
          text: 'Cancel',
          onPress: rej,
          style: 'cancel',
        },
        { text: 'OK', onPress: res },
      ],
      {
        cancelable: true,
        onDismiss: rej,
      }
    )
  })
}


function openSettingsApp() {
  return new Promise((res, rej) => {
    Linking.openURL('app-settings:')
      .then(() => {
        function handleChange(nextAppState) {
          if(nextAppState === 'active') {
            res()
            AppState.removeEventListener('change', handleChange)
          }
        }
        AppState.addEventListener('change', handleChange)
      })
      .catch(err => rej(err))
  })
}


function requestUserPermission() {
  return messaging().requestPermission()
    .then(authStatus => {
      console.log({ authStatus })
      if(authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        return authStatus
      }
      if(authStatus === messaging.AuthorizationStatus.DENIED) {
        // user denided push notifications previously
        if(Platform.OS === 'ios') {
          return goToSettings()
            .then(() => openSettingsApp())
            .then(() => messaging().requestPermission())
            .then(status => {
              if(status === messaging.AuthorizationStatus.AUTHORIZED ||
                status === messaging.AuthorizationStatus.PROVISIONAL) {
                return status
              }
              throw new Error('DENIED')
            })
        }
      }
    })
}


export default function PushNotificationsContainer() {
  const setAppSettings = useSetData('app')
  const setupNotification = useCallback(() => {
    requestUserPermission()
      .then((data) => iid().getToken())
      .then(token => {
        // fetch('https://wecre8.inprogress.rocks/api/v1/devices', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ token, device_type: Platform.OS, device_id: getUniqueId() }),
        // })
      })
      .finally(() => setAppSettings('done'))
  }, [])
  return (
    <PushNotificationsView skip={() => setAppSettings('done')} setupNotification={setupNotification}/>
  )
}
