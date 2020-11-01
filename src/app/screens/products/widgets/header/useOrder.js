import { Platform, ActionSheetIOS } from 'react-native'
import DialogAndroid from 'react-native-dialogs'
import { useTranslations } from '@cranium/i18n'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import theme from 'theme'


export default function useOrder(filter) {
  const { gettext } = useTranslations()
  const filters = useSelector(state => get(state, 'products.filters'))
  const options = useMemo(() => ([
    {
      label: gettext('Most popular'),
      id: 0,
      sortBy: { field: 'POPULARITY', direction: 'DESC' },
    },
    {
      label: gettext('Price: Low to High'),
      id: 1,
      sortBy: { field: 'MINIMAL_PRICE', direction: 'ASC' },
    },
    {
      label: gettext('Price: High to Low'),
      id: 2,
      sortBy: { field: 'MINIMAL_PRICE', direction: 'DESC' },
    },
    {
      label: gettext('New in'),
      id: 3,
      sortBy: { field: 'PUBLISHED', direction: 'DESC' },
    },
  ]), [gettext])
  return useCallback(() => {
    if(Platform.OS === 'ios') {
      return ActionSheetIOS.showActionSheetWithOptions(
        {
          title: gettext('Sort by:'),
          tintColor: theme.color,
          options: [...options.map(({ label }) => label), gettext('Cancel')],
          cancelButtonIndex: 4,
        },
        buttonIndex => {
          if(buttonIndex === 4) { return }
          const sortBy = get(options, `[${buttonIndex}].sortBy`)
          filter({ ...filters, sortBy })
        },
      )
    }
    DialogAndroid.showPicker(
      null,
      null, {
        items: options,
        positiveText: null,
        negativeText: 'Cancel',
        contentColor: theme.fontColor,
        negativeColor: theme.textPurple,
      })
      .then(({ selectedItem, action }) => {
        if(action !== 'actionSelect') { return }
        filter({ ...filters, sortBy: selectedItem.sortBy })
      })
  }, [gettext, options, filter, filters])
}
