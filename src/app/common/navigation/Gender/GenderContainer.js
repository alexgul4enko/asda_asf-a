import { useCallback } from 'react'
import { ActionSheetIOS, Platform } from 'react-native'
import { useSetData } from '@cranium/resource'
import { useSelector } from 'react-redux'
import DialogAndroid from 'react-native-dialogs'
import Gender from './Gender'
import get from 'lodash/get'
import theme from 'theme'

export default function GenderContainer() {
  const setGender = useSetData('gender')
  const gender = useSelector(state => get(state, 'gender.data'))

  const changeGender = useCallback(() => {
    if(Platform.OS === 'ios') {
      return ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Men', 'Women', 'Cancel'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if(buttonIndex === 2) { return }
          setGender(buttonIndex === 1 ? 'F' : 'M')
        },
      )
    }
    DialogAndroid.showPicker(
      null,
      null, {
        items: [{ label: 'Men', id: 'M' }, { label: 'Women', id: 'F' }],
        positiveText: null,
        negativeText: 'Cancel',
        contentColor: theme.fontColor,
        negativeColor: theme.textPurple,
      })
      .then(({ selectedItem, action }) => {
        if(action !== 'actionSelect') { return }
        setGender(selectedItem.id)
      })
  }, [])
  return (
    <Gender gender={gender} changeGender={changeGender}/>
  )
}
