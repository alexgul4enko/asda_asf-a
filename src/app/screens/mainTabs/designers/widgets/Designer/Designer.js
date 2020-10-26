import { useMemo } from 'react'
import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Avatar from 'common/widgets/avatar'
import styles from './designer.styles'
import makeSlug from 'common/utils/makeSlug'
import get from 'lodash/get'

export default function Designer({ avatar, firstName, lastName, id }) {
  const name = useMemo(() => {
    return [firstName, lastName].filter(Boolean).join(' ')
  }, [firstName, lastName])
  const params = useMemo(() => ({ slug: makeSlug(name, id) }), [id, name])
  return (
    <Link to="Designer" params={params} style={styles.btn}>
      <Avatar
        url={get(avatar, 'url')}
        size={80}
        resizeMode="cover"
        style={styles.avatar}
      />
      <Text style={styles.title}>{name}</Text>
    </Link>
  )
}
