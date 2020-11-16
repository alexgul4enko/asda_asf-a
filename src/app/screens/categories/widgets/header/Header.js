import Category from '../Category'
import { useRoute } from '@react-navigation/native'
import { useTranslations } from '@cranium/i18n'

export default function Header() {
  const route = useRoute()
  const { gettext } = useTranslations()
  return (
    <Category
      {...route.params}
      name={`${gettext('View all in')} ${route.params.title}`}
      rootLink
    />
  )
}
