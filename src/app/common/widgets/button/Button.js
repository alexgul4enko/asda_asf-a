import { useMemo } from 'react'
import { Text, View, Platform, ViewPropTypes, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import styles from './button.styles'
import theme from 'theme'

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
}

Button.defaultProps = {
  primary: false,
  title: '',
  disabled: false,
  children: undefined,
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
  textStyle,
  ...rest
}) {
  const buttonStyles = useMemo(() => ([styles.button, primary && styles.primaryButton, style]), [style])
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
