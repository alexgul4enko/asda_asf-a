import PropTypes from 'prop-types'
import Animated, { Easing } from 'react-native-reanimated'
import Button from 'common/widgets/button'
import { Text } from 'react-native'
import { useMemo, useEffect, useCallback } from 'react'
import interpolateColors from 'common/utils/interpolateColors'
import get from 'lodash/get'
import styles from './delivery.styles'
import theme from 'theme'

Radio.propTypes = {
  isActive: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  name: PropTypes.node,
  price: PropTypes.object,
  currency: PropTypes.string,
}

Radio.defaultProps = {
  isActive: undefined,
  value: undefined,
  name: undefined,
  price: undefined,
  currency: undefined,
}

export default function Radio({ isActive, onChange, value, name, price, currency }) {
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

  const optionStyles = useMemo(() => ([
    styles.buttonWrapper,
    {
      borderColor: interpolateColors(
        animatedValue,
        [0, 1],
        [theme.grey, theme.primary],
      ),
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

  const title = useMemo(() => {
    const pricetext = get(price, 'amount') ? `+${currency}${get(price, 'amount')}` : null
    return [name, pricetext].filter(Boolean).join(' | ')
  }, [name, price, currency])

  return (
    <Animated.View style={optionStyles}>
      <Button onPress={handlePress} style={styles.button}>
        <Animated.View style={rootCircle}>
          <Animated.View style={innerCircle}/>
        </Animated.View>
        <Text style={styles.title}>{title}</Text>
      </Button>
    </Animated.View>
  )
}
