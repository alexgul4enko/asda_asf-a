import { FlatList, View } from 'react-native'
import Celebrity from './widgets/Celebrity'
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
