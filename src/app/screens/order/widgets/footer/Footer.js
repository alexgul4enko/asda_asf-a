import PropTypes from 'prop-types'
import { View, Text, Linking } from 'react-native'
import Button from 'common/widgets/button'
import Address from 'screens/addressBook/widgets/address'
import { useCallback } from 'react'
import styles from './footer.styles'
import get from 'lodash/get'

Footer.propTypes = {
  subtotal: PropTypes.object,
  shippingPrice: PropTypes.object,
  total: PropTypes.object,
  shippingAddress: PropTypes.object,
  canPayNow: PropTypes.bool,
  lastPayment: PropTypes.object,
}

Footer.defaultProps = {
  subtotal: undefined,
  shippingPrice: undefined,
  total: undefined,
  shippingAddress: undefined,
  canPayNow: undefined,
  lastPayment: undefined,
}

export default function Footer({
  subtotal,
  shippingPrice,
  total,
  shippingAddress,
  canPayNow,
  lastPayment,
}) {
  const pay = useCallback(() => Linking.openURL(get(lastPayment, 'redirectPostUrl')), [])
  return (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.title}>{gettext('Order summary (inc. VAT)')}</Text>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{gettext('Subtotal')}</Text>
          <Text style={styles.totalLabel}>{get(total, 'currency')} {(get(subtotal, 'gross.amount') || 0).toLocaleString()}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{gettext('Shipping')}</Text>
          <Text style={styles.totalLabel}>{get(total, 'currency')} {(get(shippingPrice, 'gross.amount') || 0).toLocaleString()}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, styles.bold]}>{gettext('Total')}</Text>
          <Text style={[styles.totalLabel, styles.bold]}>{get(total, 'currency')} {(get(total, 'gross.amount') || 0).toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.address}>
        <Address {...shippingAddress} readOnly>
          <Text style={styles.shippingTitle}>{gettext('Shipping address')}</Text>
        </Address>
      </View>
      {
        canPayNow ? (
          <View style={styles.btnWrapper}>
            <Button title={gettext('Pay now')} style={styles.pay} onPress={pay} primary/>
          </View>
        ) : null
      }
    </View>
  )
}
