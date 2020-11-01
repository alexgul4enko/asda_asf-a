import PropTypes from 'prop-types'
import Button from 'common/widgets/button'
import styles from './clear.styles'

Clear.propTypes = {
  clear: PropTypes.func.isRequired,
}

export default function Clear({ clear }) {
  return (
    <Button
      title={gettext('clear')}
      outline
      onPress={clear}
      style={styles.clear}
      textStyle={styles.clearText}
    />
  )
}
