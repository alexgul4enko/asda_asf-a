import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { SharedElement } from 'react-navigation-shared-element'
import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Avatar from 'common/widgets/avatar'
import makeSlug from 'common/utils/makeSlug'
import get from 'lodash/get'
import styles from './user-card.styles'

UserCard.propTypes = {
  avatar: PropTypes.shape({
    url: PropTypes.string,
  }),
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

UserCard.defaultProps = {
  avatar: undefined,
  firstName: undefined,
  lastName: undefined,
}

export default function UserCard({ avatar, firstName, lastName, id, to }) {
  const name = useMemo(() => {
    return [firstName, lastName].filter(Boolean).join(' ')
  }, [firstName, lastName])
  const params = useMemo(() => ({ slug: makeSlug(name, id), avatar: get(avatar, 'url'), id }), [id, name, avatar])
  return (
    <Link to={to} params={params} style={styles.btn}>
      <SharedElement id={`item.${id}.photo`}>
        <Avatar
          url={get(avatar, 'url')}
          resizeMode="cover"
          style={styles.avatar}
          responsive
        />
      </SharedElement>
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
