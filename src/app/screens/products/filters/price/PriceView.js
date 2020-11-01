import PropTypes from 'prop-types'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import ApplyButton from '../applyButton'
import Input from './Input'
import styles from './price.styles'

PriceView.propTypes = {
  minPrice: PropTypes.node,
  maxPrice: PropTypes.node,
  fromPrice: PropTypes.func.isRequired,
  toPrice: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  error: PropTypes.node,
}

PriceView.defaultProps = {
  minPrice: undefined,
  maxPrice: undefined,
  error: undefined,
}


export default function PriceView({
  minPrice,
  maxPrice,
  fromPrice,
  toPrice,
  handleBlur,
  error,
}) {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.root}
        keyboardShouldPersistTaps="handled"
        style={styles.root}
      >
        <View style={styles.form}>
          <View style={styles.inputsRow}>
            <Input
              label={gettext('from')}
              value={minPrice && minPrice + ''}
              onBlur={handleBlur}
              onChange={fromPrice}
            />
            <Input
              label={gettext('to')}
              value={maxPrice && maxPrice + ''}
              onBlur={handleBlur}
              onChange={toPrice}
            />
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.root}/>
        <ApplyButton step={2}/>
      </ScrollView>
    </SafeAreaView>
  )
}
