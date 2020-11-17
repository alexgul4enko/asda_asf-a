import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import Avatar from 'common/widgets/avatar'
import get from 'lodash/get'
import makeSlug from 'common/utils/makeSlug'
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
  translation: PropTypes.object,
}

Category.defaultProps = {
  name: undefined,
  translation: undefined,
  id: undefined,
  slug: undefined,
  backgroundImage: undefined,
  promoImage: undefined,
  children: undefined,
  rootLink: undefined,
  type: 'category',
}

export default function Category({ name, backgroundImage, promoImage, children, id, rootLink, type, translation }) {
  const url = useMemo(() => {
    if(!promoImage && !backgroundImage) { return }
    return get(backgroundImage, 'url') || get(promoImage, 'url')
  }, [backgroundImage, promoImage])

  const textStyle = useMemo(() => ([styles.title, rootLink && styles.rootLink]), [rootLink])
  const rootLinkOptions = useMemo(() => {
    const slug = makeSlug(get(translation, 'name') || name, id)
    if(get(children, 'totalCount')) {
      return {
        to: 'Categories',
        params: { parent: id, title: get(translation, 'name') || name, slug },
      }
    }
    return {
      to: 'Products',
      params: { slug, type },
    }
  }, [get(children, 'totalCount'), id, name, type, translation])
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
      <Text style={textStyle}>{get(translation, 'name') || name}</Text>
      <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={24}/>
    </Link>
  )
}
