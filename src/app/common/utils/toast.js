import { Platform, ToastAndroid } from 'react-native'
import { RNToasty } from 'react-native-toasty'
export default function toast({ title, position }) {
  if(Platform.OS === 'ios') {
    return RNToasty.Show({
      title: title,
      position: position,
    })
  }
  return ToastAndroid.showWithGravity(title, ToastAndroid.SHORT, ToastAndroid.TOP)
}
