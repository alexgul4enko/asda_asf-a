import PropTypes from 'prop-types'
import { FlatList, SafeAreaView } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import keyExtractor from './utils/keyExtractor'
import styles from './country-area.styles'

CountryAreaView.propTypes = {
  data: PropTypes.array,
  refetch: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  renderItem: PropTypes.func.isRequired,
}

CountryAreaView.defaultProps = {
  data: undefined,
}

export default function CountryAreaView({ data, refetch, refreshing, isLoading, renderItem }) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onRefresh={refetch}
          refreshing={refreshing}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={<ListEmptyComponent/>}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
