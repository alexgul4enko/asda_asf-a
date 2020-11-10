import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { LoadingWrapper } from 'common/widgets/loading'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import styles from './recent.styles'

RecentView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
}


export default function RecentView({ isLoading, data }) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{gettext('Recently viewed items')}</Text>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={data}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          horizontal
        />
      </LoadingWrapper>
    </View>
  )
}
