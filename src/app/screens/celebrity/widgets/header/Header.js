import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Avatar from 'common/widgets/avatar'
import CollapseText from 'common/widgets/collapseText'
import { SocialButton } from 'common/widgets/button'
import { useMemo } from 'react'
import get from 'lodash/get'
import styles from './header.styles'

Header.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  socialMedias: PropTypes.array,
  celebrity: PropTypes.shape({
    coverImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    description: PropTypes.string,
  }),
}

Header.defaultProps = {
  celebrity: undefined,
  firstName: undefined,
  lastName: undefined,
  socialMedias: undefined,
}

export default function Header({ celebrity, firstName, lastName, socialMedias }) {
  const socialButtons = useMemo(() => {
    if(!Array.isArray(socialMedias)) { return null }
    return socialMedias.map(med => (<
      SocialButton
      {...med}
      key={med.type}
      style={styles.mediaButton}
    />
    ))
  }, [socialMedias])
  return (
    <View style={styles.header}>
      <Avatar
        url={get(celebrity, 'coverImage.url')}
        resizeMode="cover"
        noImage="noimage"
        style={styles.avatar}
      />
      <View style={styles.social}>
        {socialButtons}
      </View>
      <View style={styles.info}>
        <CollapseText style={styles.desc}>
          {get(celebrity, 'description')}
        </CollapseText>
        <Text style={styles.title}>{gettext('My top product list')}</Text>
      </View>
    </View>
  )
}
