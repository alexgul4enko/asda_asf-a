import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Button from 'common/widgets/button'
import styles from './home.styles'

Home.propTypes = {
  route: PropTypes.object.isRequired,
}

export default function Home({ route }) {
  return (
    <View style={styles.content}>
      <Text>{route.name}</Text>
    </View>
  )
}
