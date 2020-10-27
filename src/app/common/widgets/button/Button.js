import { useMemo } from 'react'
import { Text, Platform, ViewPropTypes, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import styles from './button.styles'

Button.propTypes = {
  title: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  outline: PropTypes.bool,
}

Button.defaultProps = {
  primary: false,
  title: undefined,
  disabled: false,
  children: undefined,
  outline: undefined,
  style: {},
  textStyle: {},
}


export default function Button({
  onPress,
  title,
  children,
  disabled,
  style,
  primary,
  outline,
  textStyle,
  ...rest
}) {
  const buttonStyles = useMemo(() => ([styles.button, primary && styles.primaryButton, outline && styles.outlineButton, style]), [style])
  const textStyles = useMemo(() => ([styles.title, primary && styles.primaryTitle, textStyle]), [textStyle])
  const content = useMemo(() => (title ? <Text style={textStyles}>{title}</Text> : children), [title, children, textStyles])
  if(Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={buttonStyles}
      >
        {content}
      </TouchableOpacity>
    )
  }
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={buttonStyles}
    >
      {content}
    </Pressable>
  )
}
