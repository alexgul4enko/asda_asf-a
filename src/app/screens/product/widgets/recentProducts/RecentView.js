import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { LoadingWrapper } from 'common/widgets/loading'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import isEmpty from 'lodash/isEmpty'
import styles from './recent.styles'

RecentView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
}


export default function RecentView({ isLoading, data }) {
  return (
    <View style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        {isEmpty(data) ? null : (<Text style={styles.title}>{gettext('Recently viewed items')}</Text>)}
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
