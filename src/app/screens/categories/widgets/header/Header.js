import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import Category from '../Category'
import { useRoute } from '@react-navigation/native'
import { useTranslations } from '@cranium/i18n'
import isEmpty from 'lodash/isEmpty'
import styles from './header.styles'

export default function Header() {
  const route = useRoute()
  const { gettext } = useTranslations()

  if(!isEmpty(route.params)) {
    return (
      <Category
        {...route.params}
        name={`${gettext('View all in')} ${route.params.title}`}
        rootLink
      />
    )
  }
  return (
    <Link to="Products" style={styles.seeAll}>
      <Text style={styles.link}>{gettext('See all producs')}</Text>
      <Icon name="chevron-right-01" size={16}/>
    </Link>
  )
}
