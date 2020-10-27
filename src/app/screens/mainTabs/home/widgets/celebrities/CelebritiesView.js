import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './celebrities.styles'

CelebritiesView.propTypes = {
  data: PropTypes.shape({
    edges: PropTypes.array,
  }),
  isLoading: PropTypes.bool.isRequired,
}

CelebritiesView.defaultProps = {
  data: undefined,
}

export default function CelebritiesView({ data, isLoading }) {
  return (
    <View style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          data={get(data, 'edges')}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </LoadingWrapper>
    </View>
  )
}
