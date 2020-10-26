import { SafeAreaView, FlatList, View, Text, TextInput } from 'react-native'
import { SimpleKeyboardLayout } from 'common/layouts'
import Icon from 'common/widgets/Icon'
import Product from './widgets/Product'
import styles from './products.styles'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'


function keyExtractor(item) {
  return item.node.id
}

function renderItem({ item }) {
  return <Product {...item.node}/>
}
// TODO: create Search component
export default function ProductsView({ data, loadNext, refetch, refreshing, route, handleSearch }) {
  return (
    <SafeAreaView style={styles.root}>
      <SimpleKeyboardLayout style={styles.root}>
        {
          isEmpty(route.params) && (
            <View style={styles.search}>
              <Icon name="search-01"/>
              <TextInput
                placeHolder="search"
                style={styles.input}
                onChangeText={handleSearch}
              />
            </View>
          )
        }
        <FlatList
          data={get(data, 'edges')}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadNext}
          onRefresh={refetch}
          refreshing={refreshing}
        />
      </SimpleKeyboardLayout>
    </SafeAreaView>
  )
}
