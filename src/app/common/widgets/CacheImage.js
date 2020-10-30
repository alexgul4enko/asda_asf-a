import PropTypes from 'prop-types'
import { useState, useMemo, useCallback } from 'react'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'


CacheImage.propTypes = {
  resizeMode: PropTypes.oneOf(['contain', 'cover', 'center', 'stretch']),
  source: Image.propTypes.source.isRequired,
  defaultImage: Image.propTypes.source,
  style: Image.propTypes.style,
  onLoad: PropTypes.func,
  responsive: PropTypes.bool,
}

CacheImage.defaultProps = {
  resizeMode: 'contain',
  defaultImage: null,
  style: {},
  onLoad: undefined,
  responsive: undefined,
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
  onLoad,
  responsive,
  style,
  ...rest
}) {
  const [hasError, setError] = useState(false)
  const [aspectRatio, setRatio] = useState()

  const cacheSource = useMemo(() => ({ ...source, headers: {} }), [source])
  const handleError = useCallback(() => setError(true), [setError])
  const resizeModeCached = useMemo(() => getResizeMode(resizeMode), [resizeMode])
  const _style = useMemo(() => ([style, aspectRatio ? { aspectRatio } : undefined]), [style, aspectRatio])
  const handleLoad = useCallback((e) => {
    onLoad && typeof onLoad === 'function' && onLoad(e)
    if(!responsive) { return }

    const { width, height } = e.nativeEvent
    const aspectRatio = width / height
    setRatio(aspectRatio)
  }, [setRatio, onLoad, responsive])
  if(hasError) {
    return (
      defaultImage && (
        <Image
          {...rest}
          source={defaultImage}
          resizeMode={resizeMode}
          style={_style}
        />
      )
    )
  }
  return (
    <FastImage
      {...rest}
      style={_style}
      source={cacheSource}
      resizeMode={resizeModeCached}
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
