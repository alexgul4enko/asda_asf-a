import PropTypes from 'prop-types'
import Radio from './Radio'
import { View } from 'react-native'
import { useMemo } from 'react'
import styles from './radio.styles'

RadioInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  valueKey: PropTypes.string,
}

RadioInput.defaultProps = {
  value: undefined,
  options: undefined,
  valueKey: undefined,
}

export default function RadioInput({ value, onChange, options, valueKey }) {
  const variants = useMemo(() => {
    return options.map(item => (
      <Radio
        {...item}
        value={item[valueKey]}
        key={item.value}
        isActive={value === item[valueKey]}
        onChange={onChange}
      />
    ))
  }, [valueKey, onChange, options, value])
  return (
    <View style={styles.root}>
      {variants}
    </View>
  )
}
