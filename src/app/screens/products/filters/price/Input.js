import PropTypes from 'prop-types'
import Animated, { Easing } from 'react-native-reanimated'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import interpolateColors from 'common/utils/interpolateColors'
import { useMemo, useCallback } from 'react'
import styles from './price.styles'
import theme from 'theme'

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.node.isRequired,
}

Input.defaultProps = {
  value: undefined,
}

export default function Input({ onChange, onBlur, value, label }) {
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const style = useMemo(() => ({
    height: 36,
    borderWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: Animated.interpolate(animatedValue, {
      inputRange: [0, 1],
      outputRange: [StyleSheet.hairlineWidth, 5],
      extrapolate: Animated.Extrapolate.CLAMP,
    }),
    borderColor: interpolateColors(
      animatedValue,
      [0, 1],
      [theme.grey, '#000000'],
    ),
  }), [animatedValue])
  const animate = useCallback((toValue) => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [animatedValue])

  const onFocus = useCallback(() => {
    animate(1)
  }, [animate])
  const handleBlur = useCallback(() => {
    animate(0)
    onBlur()
  }, [animate, onBlur])
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={style}>
        <TextInput
          style={styles.input}
          blurOnSubmit
          enablesReturnKeyAutomatically
          returnKeyType="done"
          keyboardType="numeric"
          onChangeText={onChange}
          value={value}
          onBlur={handleBlur}
          onFocus={onFocus}
        />
      </Animated.View>
    </View>
  )
}
