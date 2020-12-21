import PropTypes from 'prop-types'
import Link from 'common/widgets/link'
import { Text, View, I18nManager } from 'react-native'
import Avatar from 'common/widgets/avatar'
import { useMemo } from 'react'
import get from 'lodash/get'
import makeSlug from 'common/utils/makeSlug'
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
  translatedProductName: PropTypes.string,
}

Product.defaultProps = {
  thumbnail: undefined,
  productName: undefined,
  variant: undefined,
  quantity: 1,
  unitPrice: undefined,
  quantityFulfilled: undefined,
  translatedProductName: undefined,
}

export default function Product({ thumbnail, quantityFulfilled, productName, variant, quantity, unitPrice, translatedProductName }) {
  const color = useMemo(() => {
    return typeof quantityFulfilled === 'number' ? '#F54046' : '#37B24D'
  }, [quantityFulfilled])
  const titleStyle = useMemo(() => ([styles.title, { color }]), [color])
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
  const price = useMemo(() => {
    const cur = get(unitPrice, 'currency')
    const amount = (get(unitPrice, 'gross.amount', '') || '').toLocaleString()
    return I18nManager.isRTL ? [cur, amount].filter(Boolean).reverse().join(' ') : [cur, amount].filter(Boolean).join(' ')
  }, [unitPrice])
  const totalPrice = useMemo(() => {
    const cur = get(unitPrice, 'currency')
    const amount = ((get(unitPrice, 'gross.amount', '') || 0) * quantity).toLocaleString()
    return I18nManager.isRTL ? [cur, amount].filter(Boolean).reverse().join(' ') : [cur, amount].filter(Boolean).join(' ')
  }, [unitPrice, quantity])

  const params = useMemo(() => ({ slug: makeSlug(translatedProductName || productName, get(variant, 'product.id')) }), [get(variant, 'product.id'), productName, translatedProductName])

  return (
    <View style={styles.product}>
      <View style={styles.data}>
        <Link to="Product" params={params} style={styles.link} >
          <Avatar
            style={styles.image}
            url={get(thumbnail, 'url')}
            noImage="noimage"
          />
        </Link>
        <View style={styles.main}>
          <Text style={titleStyle}>{typeof quantityFulfilled === 'number' ? gettext('Unfullfiled') : gettext('Fullfiled')}</Text>
          <Text
            numberOfLines={2}
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.name}
          >
            {translatedProductName || productName}
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
