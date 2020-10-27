import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { useMemo } from 'react'
import styles from './promo.styles'

Promo.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  block: PropTypes.bool,
}

Promo.defaultProps = {
  primary: false,
  block: false,
}

export default function Promo({ title, children, primary, block }) {
  const style = useMemo(() => ([
    styles.container, primary ? styles.primary : undefined,
  ]), [primary])
  return (
    <View style={style}>
      {block ? <View style={styles.rect}/> : null}
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  )
}
