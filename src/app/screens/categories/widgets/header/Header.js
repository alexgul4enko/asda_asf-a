import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { useRoute } from '@react-navigation/native'
import isEmpty from 'lodash/isEmpty'
import styles from './header.styles'

export default function Header() {
  const route = useRoute()
  if(!isEmpty(route.params)) {
    return null
  }
  return (
    <Link to="Products" style={styles.seeAll}>
      <Text style={styles.link}>{gettext('See all producs')}</Text>
      <Icon name="chevron-right-01" size={16}/>
    </Link>
  )
}
