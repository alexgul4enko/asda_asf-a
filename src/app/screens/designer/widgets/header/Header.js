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
  designer: PropTypes.shape({
    coverImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    description: PropTypes.string,
  }),
  avatar: PropTypes.shape({
    url: PropTypes.string,
  }),
  hasProducts: PropTypes.bool,
}

Header.defaultProps = {
  designer: undefined,
  firstName: undefined,
  lastName: undefined,
  socialMedias: undefined,
  avatar: undefined,
  hasProducts: undefined,
}

export default function Header({ designer, firstName, lastName, socialMedias, avatar, hasProducts }) {
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
        url={get(designer, 'coverImage.url')}
        resizeMode="cover"
        noImage="noimage"
        style={styles.avatar}
      />
      <View style={styles.designer}>
        <View style={styles.photoWrapper}>
          <Avatar
            url={get(avatar, 'url')}
            resizeMode="cover"
            style={styles.photo}
          />
        </View>
        <View style={styles.social}>
          {socialButtons}
        </View>
      </View>
      <View style={styles.info}>
        <CollapseText style={styles.desc}>
          {get(designer, 'translation.description', get(designer, 'description')) }
        </CollapseText>
        {hasProducts ? <Text style={styles.title}>{gettext('My top product list')}</Text> : null}
      </View>
    </View>
  )
}
