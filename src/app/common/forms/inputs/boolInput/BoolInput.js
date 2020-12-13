import PropTypes from 'prop-types'
import { View, Switch, Text } from 'react-native'
import { useCallback } from 'react'
import styles from './bool-input'
import theme from 'theme'

BoolInput.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.node,
  style: PropTypes.any,
  textStyle: PropTypes.any,
}

BoolInput.defaultProps = {
  value: false,
  text: undefined,
  style: undefined,
  textStyle: undefined,
}

export default function BoolInput({ text, value, onChange, style, textStyle }) {
  const onValueChange = useCallback((value) => onChange(value), [onChange])
  return (
    <View style={[styles.main, style]}>
      <Text
        numberOfLines={1}
        allowFontScaling={false}
        ellipsizeMode="tail"
        style={[styles.text, textStyle]}
      >
        {text}
      </Text>
      <Switch
        trackColor={{ false: theme.grey, true: theme.primary }}
        thumbColor='#ffffff'
        ios_backgroundColor={theme.primaryLight}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  )
}
