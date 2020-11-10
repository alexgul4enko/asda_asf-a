import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Avatar from 'common/widgets/avatar'
import { useMemo } from 'react'
import get from 'lodash/get'
import styles from './product.styles'

Product.propTypes = {
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
  }),
  productName: PropTypes.string,
  variant: PropTypes.shape({
    attributes: PropTypes.array,
  }),
  quantity: PropTypes.number,
  unitPrice: PropTypes.object,
}

Product.defaultProps = {
  thumbnail: undefined,
  productName: undefined,
  variant: undefined,
  quantity: 1,
  unitPrice: undefined,
}

export default function Product({ thumbnail, productName, variant, quantity, unitPrice }) {
  const attributes = useMemo(() => {
    if(!Array.isArray(get(variant, 'attributes'))) { return null }
    return variant.attributes.map(({ values, attribute }) => {
      return (
        <Text style={styles.variant} key={get(attribute, 'id')}>
          <Text>{get(attribute, 'name')}</Text>
          <Text>:</Text>
          <Text> </Text>
          <Text style={styles.value}>{get(values, '[0].name')}</Text>
        </Text>
      )
    })
  }, [variant])

  const totalPrice = useMemo(() => {
    const cur = get(unitPrice, 'currency')
    const amount = ((get(unitPrice, 'gross.amount', '') || 0) * quantity).toLocaleString()
    return [cur, amount].filter(Boolean).join(' ')
  }, [unitPrice, quantity])

  return (
    <View style={styles.product}>
      <View style={styles.data}>
        <Avatar
          style={styles.image}
          url={get(thumbnail, 'url')}
          noImage="noimage"
        />
        <View style={styles.main}>
          <Text
            numberOfLines={2}
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.name}
          >
            {productName}
          </Text>
          {attributes}
          <Text style={styles.variant}>
            <Text>{gettext('Quantity')}</Text>
            <Text>:</Text>
            <Text> </Text>
            <Text style={styles.value}>{quantity}</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.totalPrice}>{totalPrice}</Text>
    </View>
  )
}
