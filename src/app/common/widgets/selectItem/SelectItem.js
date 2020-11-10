import PropTypes from 'prop-types'
import Button from 'common/widgets/button'
import { Text } from 'react-native'
import { useCallback, useMemo } from 'react'
import get from 'lodash/get'
import styles from './select-item.styles'

SelectItem.propTypes = {
  valueKey: PropTypes.string,
  titleKey: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  active: PropTypes.bool,
  goBack: PropTypes.func.isRequired,
}

SelectItem.defaultProps = {
  valueKey: undefined,
  titleKey: undefined,
  value: undefined,
  active: undefined,
}

export default function SelectItem({ valueKey, titleKey, value, onChange, active, goBack }) {
  const handlePress = useCallback(() => {
    onChange(value)
    goBack()
  }, [goBack, onChange, value])
  const style = useMemo(() => ([
    styles.root,
    active === get(value, valueKey) && styles.active,
  ]), [active, value, valueKey])
  return (
    <Button onPress={handlePress} style={style}>
      <Text>{get(value, titleKey)}</Text>
    </Button>
  )
}
