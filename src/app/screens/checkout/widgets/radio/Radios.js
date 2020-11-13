import PropTypes from 'prop-types'
import Radio from './Radio'
import { View } from 'react-native'
import { useMemo } from 'react'
import styles from './delivery.styles'

Delivery.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.array,
  currency: PropTypes.string,
  style: PropTypes.any,
}

Delivery.defaultProps = {
  value: undefined,
  options: undefined,
  currency: undefined,
  style: undefined,
  onChange: undefined,
}

export default function Delivery({ value, onChange, options, currency, style }) {
  const variants = useMemo(() => {
    return options.map(item => (
      <Radio
        {...item}
        value={item.id}
        key={item.id}
        isActive={value === item.id}
        onChange={onChange}
        currency={currency}
      />
    ))
  }, [onChange, options, value, currency])
  return (
    <View style={[styles.root, style]}>
      {variants}
    </View>
  )
}
