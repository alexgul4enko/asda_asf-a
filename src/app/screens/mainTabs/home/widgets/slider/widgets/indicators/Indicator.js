import PropTypes from 'prop-types'
import Animated, { Easing } from 'react-native-reanimated'
import { useMemo, useEffect } from 'react'
import styles from './indicator.styles'

Indicator.propTypes = {
  isActive: PropTypes.bool.isRequired,
}

export default function Indicator({ isActive }) {
  const animatedValue = useMemo(() => new Animated.Value(isActive ? 1 : 0), [])
  const style = useMemo(() => ([
    styles.dot,
    {
      opacity: Animated.interpolate(animatedValue, {
        inputRange: [0, 1],
        outputRange: [0.5, 1],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    },
  ]), [animatedValue])
  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: isActive ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [isActive])
  return (<Animated.View style={style}/>)
}
