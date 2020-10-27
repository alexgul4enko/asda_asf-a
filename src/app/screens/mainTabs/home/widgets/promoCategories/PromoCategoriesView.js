import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { useCallback } from 'react'
import { LoadingWrapper } from 'common/widgets/loading'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './promo-categories.styles'

PromoCategoriesView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    edges: PropTypes.array,
  }),
  type: PropTypes.oneOf(['TOP', 'POPULAR']).isRequired,
}

PromoCategoriesView.defaultProps = {
  data: undefined,
}

export default function PromoCategoriesView({ isLoading, data, type }) {
  const item = useCallback((...args) => renderItem(...args, type), [type])
  return (
    <View style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          data={get(data, 'edges')}
          renderItem={item}
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
