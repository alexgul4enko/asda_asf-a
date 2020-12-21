import PropTypes from 'prop-types'
import { FlatList, SafeAreaView } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import Header from './widgets/header'
import ApplyButton from '../applyButton'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import get from 'lodash/get'
import styles from './filters.styles'

FiltersView.propTypes = {
  data: PropTypes.shape({
    edges: PropTypes.array,
  }),
  isLoading: PropTypes.bool,
  category: PropTypes.object,
  userData: PropTypes.object,
}

FiltersView.defaultProps = {
  data: undefined,
  isLoading: undefined,
  category: undefined,
  userData: undefined,
}

export default function FiltersView({ data, isLoading, category, userData }) {
  return (
    <SafeAreaView style={styles.list}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          ListHeaderComponent={<Header category={category} userData={userData}/>}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={get(data, 'edges')}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
        <ApplyButton step={1}/>
      </LoadingWrapper>
    </SafeAreaView>
  )
}
