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
  quantityFulfilled: PropTypes.number,
}

Product.defaultProps = {
  thumbnail: undefined,
  productName: undefined,
  variant: undefined,
  quantity: 1,
  unitPrice: undefined,
  quantityFulfilled: undefined,
}

export default function Product({ thumbnail, quantityFulfilled, productName, variant, quantity, unitPrice }) {
  const color = useMemo(() => {
    return typeof quantityFulfilled === 'number' ? '#F54046' : '#37B24D'
  }, [quantityFulfilled])
  const titleStyle = useMemo(() => ([styles.title, { color }]), [color])
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
  const price = useMemo(() => {
    const cur = get(unitPrice, 'currency')
    const amount = (get(unitPrice, 'gross.amount', '') || '').toLocaleString()
    return [cur, amount].filter(Boolean).join(' ')
  }, [unitPrice])
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
          <Text style={titleStyle}>{typeof quantityFulfilled === 'number' ? gettext('Unfullfiled') : gettext('Fullfiled')}</Text>
          <Text
            numberOfLines={2}
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.name}
          >
            {productName}
          </Text>
          {attributes}
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerInfo}>{gettext('Price')}</Text>
          <Text style={styles.footerValue}>{price}</Text>
        </View>
        <View>
          <Text style={[styles.footerInfo, styles.center]}>{gettext('Quantity')}</Text>
          <Text style={[styles.footerValue, styles.center]}>{quantity}</Text>
        </View>
        <View>
          <Text style={[styles.footerInfo, styles.end]}>{gettext('Total price')}</Text>
          <Text style={[styles.footerValue, styles.end, styles.bold]}>{totalPrice}</Text>
        </View>
      </View>
    </View>
  )
}
