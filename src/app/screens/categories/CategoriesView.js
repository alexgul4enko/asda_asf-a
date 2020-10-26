import ListPropTypes from 'common/prop-types/List'
import { FlatList, SafeAreaView } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import Header from './widgets/header'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './categories.styles'


CategoriesView.propTypes = ListPropTypes

CategoriesView.defaultProps = {
  data: undefined,
}

export default function CategoriesView({ data, loadNext, refetch, refreshing, isLoading }) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={<Header/>}
          data={get(data, 'edges', [])}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadNext}
          onRefresh={refetch}
          refreshing={refreshing}
          ListEmptyComponent={<ListEmptyComponent/>}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
