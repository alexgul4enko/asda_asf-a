import messaging from '@react-native-firebase/messaging'
import { Platform, Alert, Linking, AppState } from 'react-native'
import iid from '@react-native-firebase/iid'
import AsyncStorage from '@react-native-community/async-storage'
import notifee from '@notifee/react-native'
// import { getUniqueId } from 'react-native-device-info'


function goToSettings(gettext) {
  return new Promise((resolve, reject) => {
    Alert.alert(
      gettext('Enable push notifications from settings'),
      null,
      [
        {
          text: 'Cancel',
          onPress: reject,
          style: 'cancel',
        },
        { text: 'OK', onPress: resolve },
      ],
      {
        cancelable: true,
        onDismiss: reject,
      }
    )
  })
}


function openSettingsApp(gettext) {
  return new Promise((resolve, reject) => {
    Linking.openSettings(gettext)
      .then(() => {
        function handleChange(nextAppState) {
          if(nextAppState === 'active') {
            resolve()
            AppState.removeEventListener('change', handleChange)
          }
        }
        AppState.addEventListener('change', handleChange)
      })
      .catch(err => reject(err))
  })
}


function requestUserPermission(gettext) {
  return messaging().requestPermission()
    .then(authStatus => {
      if(authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        return authStatus
      }
      if(authStatus === messaging.AuthorizationStatus.DENIED) {
        if(Platform.OS === 'ios') {
          return goToSettings()
            .then(() => openSettingsApp(gettext))
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

export default function registerPushNotifications(gettext) {
  return requestUserPermission()
    .then((data) => {
      messaging().registerDeviceForRemoteMessages()
      messaging().subscribeToTopic('promo')
        .then(_ => AsyncStorage.setItem('promo_subscription', 'true'))
      if(Platform.OS === 'android') {
        notifee.createChannel({
          name: 'wecre8',
          id: 'wecre8',
        })
      }
      return iid().getToken()
    })
    .then(token => {
      // Send token to firebase analitics
      // fetch('https://wecre8.inprogress.rocks/api/v1/devices', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ token, device_type: Platform.OS, device_id: getUniqueId() }),
      // })
    })
}
