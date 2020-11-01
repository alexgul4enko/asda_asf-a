import PropTypes from 'prop-types'
import { FlatList, SafeAreaView } from 'react-native'
import ApplyButton from '../applyButton'
import keyExtractor from './utils/keyExtractor'
import get from 'lodash/get'
import styles from './category.styles'

CategoryView.propTypes = {
  loadNext: PropTypes.func.isRequired,
  data: PropTypes.shape({
    edges: PropTypes.array,
  }),
  renderItem: PropTypes.func.isRequired,
}

CategoryView.defaultProps = {
  data: undefined,
}

export default function CategoryView({ loadNext, data, renderItem }) {
  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={get(data, 'edges')}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        onEndReached={loadNext}
      />
      <ApplyButton step={2}/>
    </SafeAreaView>
  )
}
