import { FlatList, View } from 'react-native'
import Celebrity from './widgets/Celebrity'
import get from 'lodash/get'
import styles from './celebrities.styles'


function keyExtractor(item) {
  return item.node.id
}

function renderItem({ item }) {
  return <Celebrity {...item.node}/>
}

export default function CelebritiesView({ data, loadNext, refetch, refreshing }) {
  return (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        data={get(data, 'edges')}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadNext}
        onRefresh={refetch}
        refreshing={refreshing}
      />
    </View>
  )
}
