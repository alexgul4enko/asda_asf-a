import PropTypes from 'prop-types'
import { SafeAreaView, FlatList, Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { LoadingWrapper } from 'common/widgets/loading'
import Header from './widgets/header'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import styles from './review-order.styles'

ReviewOrderView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lines: PropTypes.array,
  refreshing: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
}

ReviewOrderView.defaultProps = {
  lines: [],
}

export default function ReviewOrderView({
  isLoading,
  lines,
  refreshing,
  refetch,
}) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={<Header/>}
          data={lines}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={refetch}
        />
        <Link primaty to="main" style={styles.button} primary>
          <Text style={styles.link}>{gettext('Continue shopping')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} color="#ffffff" size={18}/>
        </Link>
      </LoadingWrapper>

    </SafeAreaView>
  )
}
