import PropTypes from 'prop-types'
import { SafeAreaView, ScrollView, View, Text, RefreshControl, Switch } from 'react-native'
import Radios from './widgets/radio'
import Promo from './widgets/promo'
import Address from './widgets/address'
import Collapse from './widgets/collapse'
import Toast from 'common/widgets/toast'
import Footer from './widgets/footer'
import { LoadingWrapper } from 'common/widgets/loading'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styles from './checkout.styles'
import theme from 'theme'

CheckoutView.propTypes = {
  finishCheckout: PropTypes.func,
  refetch: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  checkout: PropTypes.object,
  setupShipping: PropTypes.func.isRequired,
  setupPayment: PropTypes.func.isRequired,
  applyPromoCode: PropTypes.func.isRequired,
  errors: PropTypes.any,
  setAdressSame: PropTypes.func.isRequired,
  isAddressSame: PropTypes.bool.isRequired,
  shippingAddress: PropTypes.object,
  billingAddress: PropTypes.object,
  setupShippingAddress: PropTypes.func.isRequired,
  setupBillingAddress: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired,
  subtotalPrice: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  removeDiscount: PropTypes.func.isRequired,
}

CheckoutView.defaultProps = {
  checkout: undefined,
  errors: undefined,
  shippingAddress: undefined,
  billingAddress: undefined,
  subtotalPrice: undefined,
  finishCheckout: undefined,
}

export default function CheckoutView({
  finishCheckout,
  refetch,
  refreshing,
  checkout,
  setupShipping,
  setupPayment,
  applyPromoCode,
  errors,
  setAdressSame,
  isAddressSame,
  shippingAddress,
  billingAddress,
  setupShippingAddress,
  setupBillingAddress,
  complete,
  subtotalPrice,
  loading,
  isLoading,
  removeDiscount,
}) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <ScrollView
          style={styles.main}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
        >
          <Text style={styles.title}>{gettext('Shipping address')}</Text>
          <Address
            {...shippingAddress}
            notitle={gettext('Select shipping address')}
            headerTitle={gettext('Shipping address')}
            onChange={setupShippingAddress}
          />

          <View style={styles.areSame}>
            <Text style={styles.sameText}>{gettext('My billing and delivery information are the same.')}</Text>
            <Switch
              trackColor={{ false: theme.grey, true: theme.primary }}
              thumbColor='#ffffff'
              ios_backgroundColor={theme.primaryLight}
              onValueChange={setAdressSame}
              value={isAddressSame}
            />
          </View>
          <Collapse isOpen={isAddressSame}>
            <Text style={styles.title}>{gettext('Billing address')}</Text>
            <Address
              {...billingAddress}
              notitle={gettext('Select billing address')}
              headerTitle={gettext('Billing address')}
              onChange={setupBillingAddress}
            />
          </Collapse>
          <Text style={styles.title}>{gettext('Delivery method')}</Text>
          <Radios
            options={get(checkout, 'availableShippingMethods', [])}
            value={get(checkout, 'shippingMethod.id')}
            valueKey="id"
            onChange={setupShipping}
            currency={get(checkout, 'subtotalPrice.currency')}
          />
          <Text style={styles.title}>{gettext('Payment method')}</Text>
          <Radios
            options={get(checkout, 'availablePaymentGateways', [])}
            value={get(checkout, 'paymentGateway')}
            valueKey="id"
            onChange={setupPayment}
            style={styles.payments}
          />
          <Promo applyPromoCode={applyPromoCode}/>
          <Footer
            complete={complete}
            subtotalPrice={get(checkout, 'subtotalPrice')}
            shippingPrice={get(checkout, 'shippingPrice')}
            totalPrice={get(checkout, 'totalPrice')}
            voucherCode={get(checkout, 'voucherCode')}
            discount={get(checkout, 'discount')}
            cacheOnDeliveryFee={get(checkout, 'cacheOnDeliveryFee')}
            removeDiscount={removeDiscount}
          />
        </ScrollView>
        <Toast error={isEmpty(errors) ? null : errors} timeout={10000}/>
      </LoadingWrapper>
    </SafeAreaView>
  )
}
