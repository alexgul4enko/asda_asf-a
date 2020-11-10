import ListPropTypes from 'common/prop-types/List'
import { FlatList, SafeAreaView } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './orders.styles'


OrdersView.propTypes = ListPropTypes

OrdersView.defaultProps = {
  data: undefined,
}

export default function OrdersView({ data, loadNext, refetch, refreshing, isLoading }) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          data={get(data, 'edges', [])}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadNext}
          onRefresh={refetch}
          refreshing={refreshing}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<ListEmptyComponent/>}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
