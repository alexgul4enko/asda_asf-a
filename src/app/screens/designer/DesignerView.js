import ListPropTypes from 'common/prop-types/List'
import { SafeAreaView, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { LoadingWrapper } from 'common/widgets/loading'
import Header from './widgets/header'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styles from './designer.styles'

DesignerView.propTypes = ListPropTypes

export default function DesignerView({
  isLoading,
  designer,
  products,
  loadNext,
  refetch,
  refreshing,
}) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={ isEmpty(designer) ? null : <Header {...designer} hasProducts={!isEmpty(get(products, 'edges'))}/>}
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
          ListEmptyComponent={isEmpty(designer) ? (<ListEmptyComponent title={gettext('No designer found')}/>) : null}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
