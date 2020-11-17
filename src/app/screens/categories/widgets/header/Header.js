import Category from '../Category'
import { I18nManager } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useTranslations } from '@cranium/i18n'

export default function Header() {
  const route = useRoute()
  const { gettext } = useTranslations()
  return (
    <Category
      {...route.params}
      name={ I18nManager.isRTL ? `${route.params.title} ${gettext('View all in')}` : `${gettext('View all in')} ${route.params.title}`}
      rootLink
    />
  )
}
