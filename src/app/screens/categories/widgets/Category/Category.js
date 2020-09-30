import { useMemo } from 'react'
import { Text } from 'react-native'
import Link from 'common/widgets/link'
import CacheImage from 'common/widgets/CacheImage'
import styles from './category.styles'

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
          resizeMode="contain"
        />
      )}
      {
        children.totalCount ? (
          <Link to="Products" style={styles.all} params={{ slug }}>
            <Text>See all</Text>
          </Link>
        ) : null
      }
      <Text>{name}</Text>
    </Link>
  )
}
