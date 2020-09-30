import { useMemo } from 'react'
import Link from 'common/widgets/link'
import CacheImage from 'common/widgets/CacheImage'
import { Text } from 'react-native'
import styles from './product.styles'
import get from 'lodash/get'

export default function Product({ name, description, slug, thumbnail }) {
  const source = useMemo(() => {
    if(!get(thumbnail, 'url')) { return }
    return { uri: thumbnail.url }
  }, [thumbnail])
  return (
    <Link to="Product" params={{ slug }} style={styles.btn}>
      {source && (
        <CacheImage
          source={source}
          style={styles.img}
          resizeMode="contain"
        />
      )}
      <Text>{name}</Text>
    </Link>
  )
}
