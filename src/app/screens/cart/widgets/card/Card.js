import PropTypes from 'prop-types'
import BagItem from 'common/widgets/bagItem'
import { View, Text, I18nManager } from 'react-native'
import CountInput from 'common/widgets/countInput'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { useCallback, useState, useMemo } from 'react'
import styles from './card.styles'

Card.propTypes = {
  updateCount: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  quantity: PropTypes.node,
  id: PropTypes.string,
}

Card.defaultProps = {
  quantity: undefined,
  id: undefined,
}

export default function Card({ updateCount, deleteItem, ...props } = {}) {
  const [count, setCount] = useState(props.quantity)

  const handledelete = useCallback(() => {
    deleteItem(props.id)
  }, [props.id, deleteItem])


  const handleBlur = useCallback((count) => {
    updateCount(props.id, count)
  }, [updateCount, props.id])

  const price = useMemo(() => {
    if(isEmpty(get(props, 'variant.pricing'))) { return null }
    const cur = get(props, 'variant.pricing.price.currency')
    const amount = get(props, 'variant.pricing.price.net.amount')
    if(!cur || !amount) { return null }
    return I18nManager.isRTL ? [cur, amount.toLocaleString()].reverse().join(' ') : [cur, amount.toLocaleString()].join(' ')
  }, [get(props, 'variant.pricing')])


  return (
    <BagItem {...props} style={styles.item} deleteItem={handledelete}>
      <View style={styles.footer}>
        <CountInput count={count} setCount={setCount} onBlur={handleBlur}/>
        <Text style={styles.price}>{price}</Text>
      </View>
    </BagItem>
  )
}
