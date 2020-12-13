import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { View, Image } from 'react-native'
import CacheImage from '../CacheImage'
import styles from './avatar.styles'

Avatar.propTypes = {
  url: PropTypes.string,
  noImage: PropTypes.string,
  size: PropTypes.number,
  style: Image.propTypes.style,
  resizeMode: PropTypes.oneOf(['contain', 'cover', 'center', 'stretch']),
  defaultImage: PropTypes.string,
  responsive: PropTypes.bool,
}

Avatar.defaultProps = {
  url: undefined,
  noImage: 'avatar',
  size: 40,
  style: undefined,
  resizeMode: undefined,
  defaultImage: undefined,
  responsive: undefined,
}

export default function Avatar({ url, size, style, resizeMode, defaultImage, noImage, responsive }) {
  const source = useMemo(() => {
    return url ? { uri: url } : { uri: noImage }
  }, [url])
  const errorImage = useMemo(() => {
    return defaultImage || { uri: noImage }
  }, [defaultImage, noImage])
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
          defaultImage={errorImage}
          responsive={responsive}
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
