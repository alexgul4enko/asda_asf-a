import PropTypes from 'prop-types'
import { Text } from 'react-native'
import get from 'lodash/get'
import styles from './section.styles'

Section.propTypes = {
  section: PropTypes.object.isRequired,
}

export default function Section({ section }) {
  if(!get(section, 'title')) { return null }
  return (
    <Text style={styles.section}>{section.title}</Text>
  )
}
