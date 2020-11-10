import PropTypes from 'prop-types'
import { useTranslations } from '@cranium/i18n'
import { FlatList, SafeAreaView } from 'react-native'
import Search from 'common/widgets/search'
import { LoadingWrapper } from 'common/widgets/loading'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import keyExtractor from './utils/keyExtractor'
import get from 'lodash/get'
import styles from './city.styles'


CityView.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  renderItem: PropTypes.func.isRequired,
  loadNext: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
}

CityView.defaultProps = {
  data: undefined,
}

export default function CityView({ data, loadNext, refetch, refreshing, isLoading, renderItem, onSearch }) {
  const { gettext } = useTranslations()
  return (
    <SafeAreaView style={styles.root}>
      <Search onSearch={onSearch} placeholder={gettext('Search')} style={styles.search}/>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          data={get(data, 'edges')}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadNext}
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
