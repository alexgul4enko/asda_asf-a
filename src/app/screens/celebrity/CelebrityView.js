import ListPropTypes from 'common/prop-types/List'
import { SafeAreaView, RefreshControl } from 'react-native'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import { FlatList } from 'react-native-gesture-handler'
import { LoadingWrapper } from 'common/widgets/loading'
import Header from './widgets/header'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styles from './celebrity.styles'

CelebrityView.propTypes = ListPropTypes

export default function CelebrityView({
  isLoading,
  celebrity,
  products,
  loadNext,
  refetch,
  refreshing,
}) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={isEmpty(celebrity) ? null : <Header {...celebrity} hasProducts={!isEmpty(get(products, 'edges'))}/>}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={get(products, 'edges')}
          onEndReached={loadNext}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
          numColumns={2}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={isEmpty(celebrity) ? <ListEmptyComponent title={gettext('No celebrity found')}/> : null}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
