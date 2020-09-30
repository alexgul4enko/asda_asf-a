import { FlatList, SafeAreaView, Text } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import Category from './widgets/Category'
import styles from './categories.styles'
import isEmpty from 'lodash/isEmpty'


function keyExtractor(item) {
  return item.node.id
}

function renderItem({ item }) {
  return <Category {...item.node}/>
}

export default function CategoriesView({ data, loadNext, refetch, refreshing, route }) {
  return (
    <SafeAreaView style={styles.root}>
      {
        isEmpty(route.params) && (
          <Link to="Products">
            <Icon name="search-01"/>
            <Text>Search</Text>
          </Link>
        )
      }
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadNext}
        onRefresh={refetch}
        refreshing={refreshing}
      />
    </SafeAreaView>
  )
}
