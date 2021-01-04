import PropTypes from 'prop-types'
import { Text, View, I18nManager } from 'react-native'
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
  translatedProductName: PropTypes.string,
}

Product.defaultProps = {
  thumbnail: undefined,
  productName: undefined,
  variant: undefined,
  quantity: 1,
  unitPrice: undefined,
  translatedProductName: undefined,
}

export default function Product({ thumbnail, productName, variant, quantity, unitPrice, translatedProductName }) {
  const attributes = useMemo(() => {
    if(!Array.isArray(get(variant, 'attributes'))) { return null }
    return variant.attributes.map(({ values, attribute }) => {
      return (
        <View style={styles.variantRow} key={get(attribute, 'id')}>
          <Text style={styles.variant}>{get(attribute, 'translation.name') || get(attribute, 'name')}</Text>
          <Text style={styles.variant}>:</Text>
          <Text style={styles.variant}> </Text>
          <Text style={[styles.variant, styles.value]}>{get(values, '[0]translation.name') || get(values, '[0].name')}</Text>
        </View>
      )
    })
  }, [variant])

  const totalPrice = useMemo(() => {
    const cur = get(unitPrice, 'currency')
    const amount = ((get(unitPrice, 'gross.amount', '') || 0) * quantity).toLocaleString()
    return I18nManager.isRTL ? [cur, amount].filter(Boolean).reverse().join(' ') : [cur, amount].filter(Boolean).join(' ')
  }, [unitPrice, quantity])


  return (
    <View style={styles.product}>
      <Avatar
        style={styles.image}
        url={get(thumbnail, 'url')}
        noImage="noimage"
        resizeMode="cover"
      />
      <View style={styles.main}>
        <View style={styles.headerRow}>
          <Text
            numberOfLines={2}
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.name}
          >
            {translatedProductName || productName}
          </Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
        {attributes}
        <View style={styles.variantRow}>
          <Text style={styles.variant}>{gettext('Quantity')}</Text>
          <Text style={styles.variant}>:</Text>
          <Text style={styles.variant}> </Text>
          <Text style={[styles.variant, styles.value]}>{quantity}</Text>
        </View>
      </View>
    </View>
  )
}
