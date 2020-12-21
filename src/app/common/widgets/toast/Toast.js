import PropTypes from 'prop-types'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import { Text } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { useMemo, useEffect, useState, useCallback } from 'react'
import isEmpty from 'lodash/isEmpty'
import styles from './toast.styles'

Toast.propTypes = {
  error: PropTypes.any,
  timeout: PropTypes.number,
  selfClearable: PropTypes.bool,
}

Toast.defaultProps = {
  error: undefined,
  timeout: undefined,
  selfClearable: undefined,
}

export default function Toast({ error, timeout, selfClearable }) {
  const [err, setErr] = useState()
  const [timer, setTimer] = useState()
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const animatedStyles = useMemo(() => ([
    styles.main,
    {
      opacity: Animated.interpolate(animatedValue, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
      transform: [
        {
          translateY: Animated.interpolate(animatedValue, {
            inputRange: [0, 1],
            outputRange: [-200, 0],
            extrapolate: Animated.Extrapolate.CLAMP,
          }),
        },
      ],
    },
  ]), [animatedValue])

  const close = useCallback(() => {
    clearTimeout(timer)
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      setErr()
    })
  }, [timer])

  useEffect(() => {
    clearTimeout(timer)
    if(!isEmpty(error)) {
      setErr(error)
      return Animated.timing(animatedValue, {
        duration: 200,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      }).start(() => {
        if(timeout) {
          setTimer(setTimeout(close, timeout))
        }
      })
    }
    if(selfClearable) {
      Animated.timing(animatedValue, {
        duration: 200,
        toValue: 0,
        easing: Easing.inOut(Easing.ease),
      }).start(() => {
        setErr(undefined)
      })
    }
  }, [error])

  return (
    <Animated.View style={animatedStyles}>
      <Text
        style={styles.text}
        numberOfLines={2}
        allowFontScaling={false}
        ellipsizeMode="tail"
      >
        {err}
      </Text>
      <Button onPress={close} style={styles.button}><Icon name="close-01" size={14}/></Button>
    </Animated.View>
  )
}
