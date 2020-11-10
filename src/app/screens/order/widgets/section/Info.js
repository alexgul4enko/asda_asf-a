import PropTypes from 'prop-types'
import { Text } from 'react-native'
import styles from './section.styles'

Info.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
}

Info.defaultProps = {
  title: undefined,
  value: undefined,
}


export default function Info({ title, value }) {
  if(!value) { return null }
  return (
    <Text style={styles.info}>
      <Text>{title}</Text>
      <Text>:</Text>
      <Text> </Text>
      <Text style={styles.value}>{value}</Text>
    </Text>
  )
}
