import PropTypes from 'prop-types'
import { useMemo, useEffect } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { ActivityIndicator } from 'react-native'
import styles from './loading.styles.js'

AbsoluteLoader.propTypes = {
  isLoading: PropTypes.bool,
}
AbsoluteLoader.defaultProps = {
  isLoading: undefined,
}

export default function AbsoluteLoader({ isLoading }) {
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const style = useMemo(() => ([
    styles.overlay,
    {
      transform: [{ scale: animatedValue }],
      opacity: animatedValue,
    },
  ]), [animatedValue])
  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: isLoading ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [isLoading])
  return (
    <Animated.View style={style}>
      <ActivityIndicator size="large" color={'#ffffff'}/>
    </Animated.View>
  )
}
