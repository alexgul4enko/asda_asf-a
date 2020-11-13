import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import { useMemo } from 'react'
import get from 'lodash/get'
import openUrl from 'common/utils/openUrl'
import styles from './footer.styles'

function policy() {
  openUrl('/help/privacy-policy')
}

function terms() {
  openUrl('/help/terms-and-conditions')
}

Footer.propTypes = {
  complete: PropTypes.func,
  subtotalPrice: PropTypes.object,
  shippingPrice: PropTypes.object,
  totalPrice: PropTypes.object,
  voucherCode: PropTypes.string,
  discount: PropTypes.object,
  removeDiscount: PropTypes.func,
}

Footer.defaultProps = {
  complete: undefined,
  subtotalPrice: undefined,
  shippingPrice: undefined,
  totalPrice: undefined,
  voucherCode: undefined,
  discount: undefined,
  removeDiscount: undefined,
}

export default function Footer({
  complete,
  subtotalPrice,
  shippingPrice,
  totalPrice,
  voucherCode,
  discount,
  removeDiscount,
}) {
  const subPrice = useMemo(() => {
    const amount = get(subtotalPrice, 'gross.amount')
    const currency = get(subtotalPrice, 'currency')
    if(!currency) {
      return null
    }
    return [currency, (amount || 0).toLocaleString()].join(' ')
  }, [subtotalPrice])
  const shipPrice = useMemo(() => {
    const amount = get(shippingPrice, 'gross.amount')
    const currency = get(subtotalPrice, 'currency')
    if(!currency) {
      return null
    }
    return [currency, (amount || 0).toLocaleString()].join(' ')
  }, [subtotalPrice, shippingPrice])
  const total = useMemo(() => {
    const amount = get(totalPrice, 'gross.amount')
    const currency = get(subtotalPrice, 'currency')
    if(!currency) {
      return null
    }
    return [currency, (amount || 0).toLocaleString()].join(' ')
  }, [subtotalPrice, totalPrice])
  const discountName = useMemo(() => {
    if(!get(discount, 'amount') || !voucherCode) { return null }
    return <Text>{gettext('Discount')} ({voucherCode})</Text>
  }, [discount])
  const discountAmount = useMemo(() => {
    const amount = get(discount, 'amount')
    const currency = get(subtotalPrice, 'currency')
    return [currency, (amount || 0).toLocaleString()].join(' ')
  }, [discount, subtotalPrice])
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>{gettext('Order summary (inc. VAT)')}</Text>
      <View style={styles.row}>
        <Text style={styles.priceAttr}>{gettext('Subtotal')}</Text>
        <Text style={styles.priceAttr}>{subPrice}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.priceAttr}>{gettext('Shipping')}</Text>
        <Text style={styles.priceAttr}>{shipPrice}</Text>
      </View>
      {
        discountName ? (
          <View style={styles.row}>
            <View style={styles.discount}>
              <Text style={styles.priceAttr}>{discountName}</Text>
              <Button style={styles.discountButton} onPress={removeDiscount}><Icon name="close-01" size={22}/></Button>
            </View>
            <Text style={styles.priceAttr}>{discountAmount}</Text>
          </View>
        ) : null
      }
      <View style={styles.row}>
        <Text style={styles.priceTotal}>{gettext('Total')}</Text>
        <Text style={styles.priceTotal}>{total}</Text>
      </View>
      <Button onPress={complete} primary style={styles.button}>
        <Text style={styles.complete}>{gettext('Proceed to checkout')}</Text>
        <Icon name="chevron-right-01" color="#ffffff" size={18}/>
      </Button>
      <Text style={styles.privacy}>
        {gettext('By placing your order, you agree to wecre8.com’s')}
        <Text> </Text>
        <Text style={styles.privacyLink} onPress={policy}>{gettext('privacy policy')}</Text>
        <Text> </Text>
        <Text>{gettext('and')}</Text>
        <Text> </Text>
        <Text style={styles.privacyLink} onPress={terms}>{gettext('conditions of use')}</Text>
      </Text>
    </View>
  )
}
