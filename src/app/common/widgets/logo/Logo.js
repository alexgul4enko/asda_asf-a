import StylePropType from 'react-style-proptype'
import { useMemo } from 'react'
import { Image } from 'react-native'
import styles from './logo.styles.js'

Logo.propTypes = {
  style: StylePropType,
}

Logo.defaultProps = {
  style: undefined,
}

const source = {
  uri: 'app_logo',
}

export default function Logo({ style }) {
  const _style = useMemo(() => ([styles.logo, style]), [style])
  return (
    <Image
      source={source}
      style={_style}
    />
  )
}
