import { useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, Text, ViewPropTypes } from 'react-native'
import Button from 'common/widgets/button'
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
  underlineColor: theme.primary,
  inputStyles: undefined,
  containerStyles: undefined,
}


export default function Input({
  placeholder,
  placeholderTextColor,
  autoCapitalize,
  autoCorrect,
  underlineColor,
  containerStyles,
  value,
  onBlur,
  onFocus,
  onChange,
  type,
  multiline,
  inputStyles,
}) {
  const [secureTextEntry, setSecure] = useState(type === 'pasword')

  const toggleSecure = useCallback(() => {
    setSecure(!secureTextEntry)
  }, [secureTextEntry, setSecure])

  const conteinerStyles = useMemo(() => ([
    styles.main,
    underlineColor ? { borderBottomColor: underlineColor } : {},
    containerStyles,
  ]), [underlineColor, containerStyles])

  const inputStyle = useMemo(() => ([styles.input, inputStyles]), [inputStyles])
  const secureText = useMemo(() => secureTextEntry ? 'Show' : 'Hide', [secureTextEntry])

  return (
    <View style={conteinerStyles}>
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
        onBlur={onBlur}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
      />
      {type === 'password' && (
        <Button
          onPress={toggleSecure}
          accessibilityLabel={secureText}
        >
          <Text style={styles.text}>
            {secureText}
          </Text>
        </Button>
      )}
    </View>
  )
}
