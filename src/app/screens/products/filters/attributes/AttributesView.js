import PropTypes from 'prop-types'
import { FlatList, SafeAreaView } from 'react-native'
import Attribute from './widgets/attribute'
import ApplyButton from '../applyButton'
import keyExtractor from './utils/keyExtractor'
import styles from './attributes.styles'

FiltersView.propTypes = {
  renderItem: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  data: PropTypes.array,
}

FiltersView.defaultProps = {
  data: [],
}

export default function FiltersView({ data, renderItem, selectAll }) {
  return (
    <SafeAreaView style={styles.list}>
      <FlatList
        ListHeaderComponent={<Attribute name={gettext('Select  All')} selectItem={selectAll}/>}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
      <ApplyButton step={2}/>
    </SafeAreaView>
  )
}
