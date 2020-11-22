import ListPropTypes from 'common/prop-types/List'
import PropTypes from 'prop-types'
import { SafeAreaView, FlatList, View } from 'react-native'
import Header from './widgets/header'
import { LoadingWrapper } from 'common/widgets/loading'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import Search from 'common/widgets/search'
import { useTranslations } from '@cranium/i18n'
import isEmpty from 'lodash/isEmpty'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './products.styles'

ProductsView.propTypes = {
  ...ListPropTypes,
  route: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
}

export default function ProductsView({
  data,
  loadNext,
  refetch,
  refreshing,
  route,
  onSearch,
  isLoading,
  filter,
}) {
  const { gettext } = useTranslations()
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={isEmpty(route.params) ? (
            <View style={styles.searchWrapper}>
              <Search onSearch={onSearch} placeholder={gettext('Search')} style={styles.search} />
            </View>
          ) : (
            <Header filter={filter}/>
          )}
          onEndReached={loadNext}
          onRefresh={refetch}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={get(data, 'edges')}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={<ListEmptyComponent/>}
          stickyHeaderIndices={[0]}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
