import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import CacheImage from 'common/widgets/CacheImage'
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
  description: PropTypes.string,
  id: PropTypes.string,
  slug: PropTypes.string,
}

Category.defaultProps = {
  name: undefined,
  description: undefined,
  id: undefined,
  slug: undefined,
  backgroundImage: undefined,
  promoImage: undefined,
  children: undefined,
}

export default function Category({ name, backgroundImage, promoImage, children, description, id, slug }) {
  const source = useMemo(() => {
    if(!promoImage && !backgroundImage) { return }
    if(backgroundImage) {
      return { uri: backgroundImage.url }
    }
    return { uri: promoImage.url }
  }, [backgroundImage, promoImage])
  const rootLinkOptions = useMemo(() => {
    if(children.totalCount) {
      return {
        to: 'Categories',
        params: { parent: id, title: name },
      }
    }
    return {
      to: 'Products',
      params: { slug },
    }
  }, [children.totalCount, id, slug, name])
  return (
    <Link {...rootLinkOptions} style={styles.btn}>
      {source && (
        <CacheImage
          source={source}
          style={styles.img}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{name}</Text>
      <Icon name="chevron-right-01" size={24}/>
    </Link>
  )
}
