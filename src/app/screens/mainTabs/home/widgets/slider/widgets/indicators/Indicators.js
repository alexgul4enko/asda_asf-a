import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useMemo } from 'react'
import Indicator from './Indicator'
import styles from './indicator.styles'

Indicators.propTypes = {
  count: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
}

export default function Indicators({ count, active }) {
  const dots = useMemo(() => {
    return Array.from(Array(count).keys()).map(item => (<Indicator key={item} isActive={active === item}/>))
  }, [count, active])
  return (
    <View style={styles.root}>
      {dots}
    </View>
  )
}
