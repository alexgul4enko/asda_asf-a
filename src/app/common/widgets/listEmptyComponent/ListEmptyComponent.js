import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styles from './empty-component.styles'

ListEmptyComponent.propTypes = {
  title: PropTypes.node,
}
ListEmptyComponent.defaultProps = {
  title: gettext('No results found'),
}

const source = { uri: 'noresults' }
export default function ListEmptyComponent({ title }) {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={source}
        style={styles.image}
      />
    </View>
  )
}
