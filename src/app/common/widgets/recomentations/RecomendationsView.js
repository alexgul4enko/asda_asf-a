import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { LoadingWrapper } from 'common/widgets/loading'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './recomendation.styles'

RecomendationsView.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  style: PropTypes.any,
}

RecomendationsView.defaultProps = {
  data: undefined,
  style: undefined,
}

export default function RecomendationsView({ isLoading, data, style }) {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>{gettext('You Might Also Like')}</Text>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={get(data, 'edges', [])}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          horizontal
        />
      </LoadingWrapper>
    </View>
  )
}
