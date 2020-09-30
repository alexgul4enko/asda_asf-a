import { FlatList, View } from 'react-native'
import Designer from './widgets/Designer'
import styles from './designers.styles'


function keyExtractor(item) {
  return item.node.id
}

function renderItem({ item }) {
  return <Designer {...item.node}/>
}

export default function DesignersView({ data, loadNext, refetch, refreshing }) {
  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadNext}
        onRefresh={refetch}
        refreshing={refreshing}
      />
    </View>
  )
}
