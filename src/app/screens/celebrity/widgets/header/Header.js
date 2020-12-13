import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Avatar from 'common/widgets/avatar'
import CollapseText from 'common/widgets/collapseText'
import { SocialButton } from 'common/widgets/button'
import { usePrefetchQuery } from '@cranium/resource'
import { useMemo } from 'react'
import get from 'lodash/get'
import styles from './header.styles'
import GALLERY from './gallery.graphql'
import Gallery from './gallery'
import { QS } from 'api'

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
  id: PropTypes.string,
  hasProducts: PropTypes.bool,
}

Header.defaultProps = {
  celebrity: undefined,
  firstName: undefined,
  lastName: undefined,
  socialMedias: undefined,
  id: undefined,
  hasProducts: undefined,
}


export default function Header({ celebrity, firstName, lastName, socialMedias, id, hasProducts }) {
  const gallery = usePrefetchQuery(GALLERY, { parseValue: 'data.userDigitalContents' })({ first: 40, filter: { userId: id } })

  const data = useMemo(() => {
    if(!Array.isArray(get(gallery, 'data.edges'))) {
      return []
    }
    return gallery.data.edges.map(({ node }) => {
      let imageUrl = get(node, 'image.url') || node.url
      if(node.type === 'VIDEO') {
        imageUrl = `https://img.youtube.com/vi/${QS.parseQueryParams(imageUrl).v}/0.jpg`
      }
      return { ...node, imageUrl }
    })
  }, [get(gallery, 'data.edges')])
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
          {get(celebrity, 'translation.description', get(celebrity, 'description'))}
        </CollapseText>
        <Gallery data={data}/>
        {hasProducts ? <Text style={styles.title}>{gettext('My top product list')}</Text> : null}
      </View>

    </View>
  )
}
