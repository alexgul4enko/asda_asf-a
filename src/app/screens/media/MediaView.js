import ListPropTypes from 'common/prop-types/List'
import { SafeAreaView, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { LoadingWrapper } from 'common/widgets/loading'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import Image from './image'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styles from './media.styles'


MediaView.propTypes = ListPropTypes

export default function MediaView({
  isLoading,
  products,
  refetch,
  refreshing,
  media,
}) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={<Image {...media} hasProducts={!isEmpty(get(products, 'products'))}/>}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={get(products, 'edges')}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
          numColumns={2}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
