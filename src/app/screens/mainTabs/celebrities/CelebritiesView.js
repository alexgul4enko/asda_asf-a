import PropTypes from 'prop-types'
import ListPropTypes from 'common/prop-types/List'
import { FlatList, View } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import Search from 'common/widgets/search'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import { useTranslations } from '@cranium/i18n'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './celebrities.styles'

CelebritiesView.propTypes = {
  ...ListPropTypes,
  onSearch: PropTypes.func.isRequired,
}

CelebritiesView.defaultProps = {
  data: undefined,
}

export default function CelebritiesView({ data, loadNext, refetch, refreshing, onSearch, isLoading }) {
  const { gettext } = useTranslations()
  return (
    <View style={styles.root}>
      <Search onSearch={onSearch} placeholder={gettext('Search')} style={styles.search}/>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          data={get(data, 'edges')}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadNext}
          onRefresh={refetch}
          refreshing={refreshing}
          numColumns={2}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={<ListEmptyComponent/>}
        />
      </LoadingWrapper>
    </View>
  )
}
