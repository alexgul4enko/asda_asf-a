import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { useState, useCallback } from 'react'
import styles from './collapse-text.styles'

CollapseText.propTypes = {
  children: PropTypes.string,
  style: PropTypes.any,
}

CollapseText.defaultProps = {
  children: undefined,
  style: undefined,
}


export default function CollapseText({ children, style }) {
  const [isShown, setShow] = useState(false)
  const collapse = useCallback(() => {
    setShow(!isShown)
  }, [isShown, setShow])
  if(!children) { return null }
  return (
    <Text style={style}>
      {children.substring(0, isShown ? children.length : 520)}
      {(!isShown && children.length > 520) ? '...' : ''}
      {children.length > 520 ? <Text style={styles.expand} onPress={collapse}>{isShown ? gettext('show less') : gettext('show more')}</Text> : null}
    </Text>
  )
}
