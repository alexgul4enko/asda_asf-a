import { useMemo } from 'react'
import { View, Image } from 'react-native'
import CacheImage from '../CacheImage'
import styles from './avatar.styles'

export default function Avatar({ url, size, style, resizeMode, defaultImage }) {
  const source = useMemo(() => {
    return url ? { uri: url } : { uri: 'avatar' }
  }, [url])
  const imageStyle = useMemo(() => {
    return [{
      width: size,
      height: size,
      borderRadius: size / 2,
    }, styles.avatar, style]
  }, [style, size])
  return (
    <View style={imageStyle}>
      {url ? (
        <CacheImage
          style={styles.image}
          source={source}
          resizeMode={resizeMode}
          defaultImage={defaultImage}
        />
      ) : (
        <Image
          source={source}
          resizeMode="cover"
          style={styles.image}
        />
      )}
    </View>
  )
}
