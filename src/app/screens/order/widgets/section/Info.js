import PropTypes from 'prop-types'
import { Text, I18nManager } from 'react-native'
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
  if(I18nManager.isRTL) {
    return (
      <Text style={styles.info}>
        <Text style={styles.value}>{value}</Text>
        <Text> </Text>
        <Text>:</Text>
        <Text>{title}</Text>
      </Text>
    )
  }
  return (
    <Text style={styles.info}>
      <Text>{title}</Text>
      <Text>:</Text>
      <Text> </Text>
      <Text style={styles.value}>{value}</Text>
    </Text>
  )
}
