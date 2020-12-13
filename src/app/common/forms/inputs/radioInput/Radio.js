import PropTypes from 'prop-types'
import Animated, { Easing } from 'react-native-reanimated'
import Button from 'common/widgets/button'
import { Text } from 'react-native'
import { useMemo, useEffect, useCallback } from 'react'
import interpolateColors from 'common/utils/interpolateColors'
import styles from './radio.styles'
import theme from 'theme'

Radio.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  title: PropTypes.any,
}

Radio.defaultProps = {
  value: undefined,
  title: undefined,
}

export default function Radio({ isActive, onChange, value, title }) {
  const animatedValue = useMemo(() => new Animated.Value(isActive ? 1 : 0), [])
  const rootCircle = useMemo(() => ([
    styles.rootCircle,
    {
      borderColor: interpolateColors(
        animatedValue,
        [0, 1],
        [theme.grey, theme.primary],
      ),
    },
  ]), [animatedValue])

  const innerCircle = useMemo(() => ([
    styles.innerCircle,
    {
      transform: [{ scale: animatedValue }],
    },
  ]), [animatedValue])

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: isActive ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [isActive])

  const handlePress = useCallback(() => {
    onChange(value)
  }, [onChange, value])

  return (
    <Button onPress={handlePress} style={styles.button}>
      <Animated.View style={rootCircle}>
        <Animated.View style={innerCircle}/>
      </Animated.View>
      <Text style={styles.title}>{title}</Text>
    </Button>
  )
}
