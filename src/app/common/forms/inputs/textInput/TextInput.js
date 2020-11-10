import PropTypes from 'prop-types'
import { useMemo, useState, useCallback } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { TextInput, ViewPropTypes, StyleSheet } from 'react-native'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import interpolateColors from 'common/utils/interpolateColors'
import theme from 'theme'
import styles from './text-input.styles'

Input.propTypes = {
  ...TextInput.propTypes,
  inputStyles: TextInput.propTypes.style,
  containerStyles: ViewPropTypes.style,
  onChange: PropTypes.func.isRequired,
}

Input.defaultProps = {
  placeholder: undefined,
  placeholderTextColor: theme.gray,
  autoCapitalize: 'none',
  autoCorrect: false,
  inputStyles: undefined,
  containerStyles: undefined,
}


export default function Input({
  placeholder,
  placeholderTextColor,
  autoCapitalize,
  autoCorrect,
  containerStyles,
  value,
  onBlur,
  onFocus,
  onChange,
  type,
  multiline,
  inputStyles,
  dataDetectorTypes,
  keyboardType,
  disabled,
}) {
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const animatedStyles = useMemo(() => ([
    styles.main,
    containerStyles,
    disabled && styles.disabled,
    {
      borderColor: interpolateColors(
        animatedValue,
        [0, 1],
        ['#DDDDDD', '#000000'],
      ),
      borderLeftWidth: Animated.interpolate(animatedValue, {
        inputRange: [0, 1],
        outputRange: [StyleSheet.hairlineWidth, 5],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    },
  ]), [animatedValue, containerStyles, disabled])

  const animate = useCallback((toValue) => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [animatedValue])

  const handleBlur = useCallback(() => {
    onBlur && onBlur()
    animate(0)
  }, [onBlur, animate])
  const handleFocus = useCallback(() => {
    onFocus && onFocus()
    animate(1)
  }, [onFocus, animate])


  const [secureTextEntry, setSecure] = useState(type === 'password')
  const toggleSecure = useCallback(() => setSecure(!secureTextEntry), [secureTextEntry, setSecure])
  const inputStyle = useMemo(() => ([styles.input, inputStyles]), [inputStyles])
  return (
    <Animated.View style={animatedStyles}>
      <TextInput
        value={value}
        multiline={multiline}
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
        onBlur={handleBlur}
        onFocus={handleFocus}
        secureTextEntry={secureTextEntry}
        dataDetectorTypes={dataDetectorTypes}
        keyboardType={keyboardType}
        editable={!disabled}
      />
      {type === 'password' && (
        <Button
          onPress={toggleSecure}
          style={styles.passwordButton}
        >
          <Icon name={secureTextEntry ? 'Show-01' : 'Hide-01'} size={24}/>
        </Button>
      )}
    </Animated.View>
  )
}
