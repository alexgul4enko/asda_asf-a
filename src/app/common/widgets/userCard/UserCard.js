import { useMemo } from 'react'
import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Avatar from 'common/widgets/avatar'
import makeSlug from 'common/utils/makeSlug'
import get from 'lodash/get'
import styles from './user-card.styles'

export default function UserCard({ avatar, firstName, lastName, id, to }) {
  const name = useMemo(() => {
    return [firstName, lastName].filter(Boolean).join(' ')
  }, [firstName, lastName])
  const params = useMemo(() => ({ slug: makeSlug(name, id) }), [id, name])
  return (
    <Link to={to} params={params} style={styles.btn}>
      <Avatar
        url={get(avatar, 'url')}
        resizeMode="cover"
        style={styles.avatar}
      />
      <Text
        numberOfLines={2}
        allowFontScaling={false}
        ellipsizeMode="tail"
        style={styles.title}
      >
        {name}
      </Text>
    </Link>
  )
}
