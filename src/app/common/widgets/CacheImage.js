import { useState, useMemo, useCallback } from 'react'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'

CacheImage.propTypes = {
  resizeMode: PropTypes.oneOf(['contain', 'cover', 'center', 'stretch']),
  source: Image.propTypes.source.isRequired,
  defaultImage: Image.propTypes.source,
  style: Image.propTypes.style,
}

CacheImage.defaultProps = {
  resizeMode: 'contain',
  defaultImage: null,
  style: {},
}

function getResizeMode(resizeMode) {
  switch (resizeMode) {
    case 'contain':
      return FastImage.resizeMode.contain
    case 'cover':
      return FastImage.resizeMode.cover
    case 'stretch':
      return FastImage.resizeMode.stretch
    case 'center':
      return FastImage.resizeMode.center
    default:
      return undefined
  }
}

export default function CacheImage({
  resizeMode,
  source,
  defaultImage,
  ...rest
}) {
  const [hasError, setError] = useState(false)
  if(hasError) {
    return (
      defaultImage && (
        <Image source={defaultImage} resizeMode={resizeMode} {...rest} />
      )
    )
  }
  const cacheSource = useMemo(() => ({ ...source, headers: {} }), [source])
  const handleError = useCallback(() => setError(true), [setError])
  const resizeModeCached = useMemo(() => getResizeMode(resizeMode), [resizeMode])
  return (
    <FastImage
      {...rest}
      source={cacheSource}
      resizeMode={resizeModeCached}
      onError={handleError}
    />
  )
}
