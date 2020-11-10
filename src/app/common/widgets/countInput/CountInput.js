import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import { useCallback } from 'react'
import styles from './count-input.styles'

CountInput.propTypes = {
  count: PropTypes.node,
  setCount: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
}

CountInput.defaultProps = {
  count: undefined,
  onBlur: undefined,
}

export default function CountInput({ count, setCount, onBlur }) {
  const onChange = useCallback((value) => {
    const val = parseInt(value)
    if(!val) { return setCount('') }
    setCount(val)
  }, [setCount])
  const increment = useCallback(() => {
    setCount((count || 0) + 1)
    onBlur && onBlur((count || 0) + 1)
  }, [setCount, count])
  const decrement = useCallback(() => {
    setCount((count || 0) - 1)
    onBlur && onBlur((count || 0) - 1)
  }, [setCount, count])
  const handleBlur = useCallback((e) => {
    const val = parseInt(e.nativeEvent.text) || 1
    setCount(val)
    onBlur && onBlur(val)
  }, [onBlur, setCount])
  return (
    <View style={styles.countRow}>
      <Button style={styles.countIncrement} onPress={decrement} disabled={!count || count <= 1}><Icon name="minus-01" size={20}/></Button>
      <TextInput
        style={styles.input}
        blurOnSubmit
        enablesReturnKeyAutomatically
        returnKeyType="done"
        keyboardType="numeric"
        onChangeText={onChange}
        value={count + ''}
        onBlur={handleBlur}
      />
      <Button style={styles.countIncrement} onPress={increment}><Icon name="plus-01" size={20}/></Button>
    </View>
  )
}
