import { Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { useTranslations } from '@cranium/i18n'
import styles from './header.styles'

export default function Header() {
  const { gettext } = useTranslations()
  return (
    <Link to="Products" style={styles.seeAll}>
      <Text style={styles.link}>{gettext('See all products')}</Text>
      <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={16}/>
    </Link>
  )
}
