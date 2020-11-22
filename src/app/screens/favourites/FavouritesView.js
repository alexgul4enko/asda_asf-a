import ListPropTypes from 'common/prop-types/List'
import { FlatList, SafeAreaView } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import renderItem from './utils/renderItem'
import styles from './favourites.styles'
import get from 'lodash/get'
import keyExtractor from './utils/keyExtractor'
import { useTranslations } from '@cranium/i18n'

FavouritesView.propTypes = {
  ...ListPropTypes,
}

FavouritesView.defaultProps = {
  data: undefined,
}

export default function FavouritesView({ data, loadNext, refetch, refreshing, isLoading }) {
  const { gettext } = useTranslations()
  return (
    <SafeAreaView style={styles.root}>
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
          ListEmptyComponent={<ListEmptyComponent title={gettext('WishList is empty')}/>}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
