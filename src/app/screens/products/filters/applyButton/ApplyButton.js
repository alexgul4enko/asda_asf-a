import PropTypes from 'prop-types'
import Button from 'common/widgets/button'
import { Text, View } from 'react-native'
import { useQuery } from '@cranium/resource'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useMemo, useCallback } from 'react'
import get from 'lodash/get'
import styles from './applayButton.styles'
import ALLPRODUCTS from '../../products.graphql'

ApplyButton.propTypes = {
  step: PropTypes.number.isRequired,
}

export default function ApplyButton({ step }) {
  const filters = useSelector(state => get(state, 'productsCount.filters', {}))
  const totalCount = useSelector(state => get(state, 'productsCount.data.totalCount', {}))
  const navigation = useNavigation()
  const products = useQuery(ALLPRODUCTS, { parseValue: 'data.products' })
  const count = useMemo(() => {
    if(totalCount === undefined) {
      return
    }
    return `(${totalCount})`
  }, [totalCount])
  const handlePress = useCallback(() => {
    navigation.pop(step)
    products.request({ ...filters, first: 16 })
  }, [navigation.pop, step, filters])
  return (
    <View style={styles.footer}>
      <Button primary onPress={handlePress} style={styles.button}>
        <Text style={styles.text}>{gettext('Show results')} {count}</Text>
      </Button>
    </View>
  )
}
