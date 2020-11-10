import PropTypes from 'prop-types'
import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { useMemo } from 'react'
import get from 'lodash/get'
import styles from './link.styles'

LinkInput.propTypes = {
  to: PropTypes.string,
  value: PropTypes.any,
  valueCode: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  params: PropTypes.object,
  disabled: PropTypes.bool,
}

LinkInput.defaultProps = {
  to: undefined,
  value: undefined,
  valueCode: undefined,
  params: undefined,
  disabled: undefined,
}

export default function LinkInput({ to, value, valueCode, onChange, params, disabled }) {
  const _params = useMemo(() => ({
    onChange,
    value,
    ...(params || {}),
  }), [onChange, value, params])
  return (
    <Link to={to} style={styles.link} params={_params} disabled={disabled}>
      <Text
        numberOfLines={1}
        allowFontScaling={false}
        ellipsizeMode="tail"
        style={styles.text}
      >
        {get(value, valueCode, value)}
      </Text>
      <Icon name="chevron-down-01" size={20}/>
    </Link>
  )
}
