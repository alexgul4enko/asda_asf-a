import ListPropTypes from 'common/prop-types/List'
import { View, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { LoadingWrapper } from 'common/widgets/loading'
import Header from './widgets/header'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './celebrity.styles'

CelebrityView.propTypes = ListPropTypes

export default function CelebrityView({
  isLoading,
  celebrity,
  products,
  loadNext,
  refresh,
  isRefreshing,
}) {
  return (
    <View style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={ <Header {...celebrity}/>}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={get(products, 'edges')}
          onEndReached={loadNext}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
          numColumns={2}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </LoadingWrapper>
    </View>
  )
}
