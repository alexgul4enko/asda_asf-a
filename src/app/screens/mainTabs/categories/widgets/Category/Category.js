import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import Avatar from 'common/widgets/avatar'
import get from 'lodash/get'
import styles from './category.styles'

Category.propTypes = {
  name: PropTypes.string,
  backgroundImage: PropTypes.shape({
    url: PropTypes.string,
  }),
  promoImage: PropTypes.shape({
    url: PropTypes.string,
  }),
  children: PropTypes.shape({
    totalCount: PropTypes.number,
  }),
  id: PropTypes.string,
  slug: PropTypes.string,
  rootLink: PropTypes.bool,
  type: PropTypes.string,
}

Category.defaultProps = {
  name: undefined,
  id: undefined,
  slug: undefined,
  backgroundImage: undefined,
  promoImage: undefined,
  children: undefined,
  rootLink: undefined,
  type: 'category',
}

export default function Category({ name, backgroundImage, promoImage, children, id, slug, rootLink, type }) {
  const url = useMemo(() => {
    if(!promoImage && !backgroundImage) { return }
    return get(backgroundImage, 'url') || get(promoImage, 'url')
  }, [backgroundImage, promoImage])

  const textStyle = useMemo(() => ([styles.title, rootLink && styles.rootLink]), [rootLink])
  const rootLinkOptions = useMemo(() => {
    if(get(children, 'totalCount')) {
      return {
        to: 'Categories',
        params: { parent: id, title: name, slug },
      }
    }
    return {
      to: 'Products',
      params: { slug, type },
    }
  }, [get(children, 'totalCount'), id, slug, name, type])
  return (
    <Link {...rootLinkOptions} style={styles.btn}>
      {!rootLink ? (
        <Avatar
          url={url}
          style={styles.img}
          resizeMode="cover"
          noImage="noimage"
        />) : null
      }
      <Text style={textStyle}>{name}</Text>
      <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={24}/>
    </Link>
  )
}
