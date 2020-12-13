import NavigationPropTypes from 'common/prop-types/Navigation'
import CheckoutView from './CheckoutView'
import { usePrefetchQuery, useGraphInifnyList, useSetData } from '@cranium/resource'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { Linking } from 'react-native'
import analytics from '@react-native-firebase/analytics'
import get from 'lodash/get'
import omit from 'lodash/omit'
import CHECKOUTDATA from './checkout-data.graphql'
import SHIPPING from './update-shipping.graphql'
import PAYMENT from './update-payment.graphql'
import PROMO from './promo.graphql'
import REMOVEPROMO from './remove-promo.graphql'
import SHIPPINGADDRESS from './shipping-address.graphql'
import BILLINGADDRESS from './billing-address.graphql'
import COMPLETE from './checkout.graphql'

CheckoutContainer.propTypes = NavigationPropTypes

export default function CheckoutContainer({ navigation }) {
  const clear = useSetData('checkoutList')
  const [isAddressSame, setAdressSame] = useState(true)
  const checkout = usePrefetchQuery(CHECKOUTDATA, { parseValue: 'data.me' })()
  useEffect(() => {
    setAdressSame(get(checkout, 'data.checkout.selectedBillingAddressId') === get(checkout, 'data.checkout.selectedShippingAddressId'))
  }, [checkout.initialLoading])

  const { refresh, isRefreshing } = useGraphInifnyList(checkout)
  const setupShipping = useCallback((val) => {
    analytics().logAddShippingInfo({
      shipping_tier: val,
    })
    checkout.request({
      checkoutId: get(checkout, 'data.checkout.id'),
      shippingMethodId: val,
    }, { query: SHIPPING, reducer: 'none' })
      .then(() => checkout.request())
  }, [checkout.request, get(checkout, 'data.checkout.id')])

  const setupPayment = useCallback((val) => {
    analytics().logAddPaymentInfo({
      payment_type: val,
      value: get(checkout, 'data.checkout.totalPrice.gross.amount'),
      currency: get(checkout, 'data.checkout.subtotalPrice.currency'),
    })
    checkout.request({
      checkoutId: get(checkout, 'data.checkout.id'),
      input: {
        amount: get(checkout, 'data.checkout.totalPrice.gross.amount'),
        gateway: val,
        token: `token${new Date().getTime()}`,
      },
    }, {
      query: PAYMENT,
      reducer: 'none',
      parseErrors: 'data.checkoutPaymentCreate.paymentErrors',
    })
      .then(() => checkout.request())
  }, [
    checkout.request,
    get(checkout, 'data.checkout.id'),
    get(checkout, 'data.checkout.totalPrice.gross.amount'),
  ])

  const applyPromoCode = useCallback((promoCode) => {
    analytics().logAddPaymentInfo({
      coupon: promoCode,
    })
    checkout.request({
      checkoutId: get(checkout, 'data.checkout.id'),
      promoCode,
    }, {
      query: PROMO,
      reducer: 'none',
      parseErrors: 'data.checkoutAddPromoCode.checkoutErrors',
    })
      .then((data) => {
        checkout.request()
      })
  }, [checkout.request, get(checkout, 'data.checkout.id')])

  const removeDiscount = useCallback(_ => {
    checkout.request({
      checkoutId: get(checkout, 'data.checkout.id'),
      promoCode: get(checkout, 'data.checkout.voucherCode'),
    }, {
      query: REMOVEPROMO,
      reducer: 'none',
      parseErrors: 'data.checkoutAddPromoCode.checkoutErrors',
    })
      .then((data) => {
        checkout.request()
      })
  }, [checkout.request, get(checkout, 'data.checkout.id'), get(checkout, 'data.checkout.voucherCode')])


  const shippingAddress = useMemo(() => {
    if(!Array.isArray(get(checkout, 'data.addresses'))) { return {} }
    const selectedId = get(checkout, 'data.checkout.selectedShippingAddressId')
    return checkout.data.addresses.find(({ id }) => selectedId === id)
  }, [checkout.data])

  const billingAddress = useMemo(() => {
    if(!Array.isArray(get(checkout, 'data.addresses'))) { return {} }
    const selectedId = get(checkout, 'data.checkout.selectedBillingAddressId')
    return checkout.data.addresses.find(({ id }) => selectedId === id)
  }, [checkout.data])

  const setupShippingAddress = useCallback((address) => {
    const addr = {
      ...omit(address, ['id', 'isDefaultBillingAddress', 'isDefaultShippingAddress', 'label']),
      city: get(address, 'city.id', ''),
      country: get(address, 'country.code', ''),
    }
    const shipping = {
      selectedShippingAddressId: address.id,
      checkoutId: get(checkout, 'data.checkout.id'),
      shippingAddress: addr,
    }


    const billing = {
      selectedBillingAddressId: address.id,
      checkoutId: get(checkout, 'data.checkout.id'),
      billingAddress: addr,
    }

    Promise.all([
      checkout.request(shipping, { query: SHIPPINGADDRESS, reducer: 'none', parseValue: 'data.checkoutShippingAddressUpdate.checkoutErrors' }),
      isAddressSame && checkout.request(billing, { query: BILLINGADDRESS, reducer: 'none', parseValue: 'data.checkoutBillingAddressUpdate.checkoutErrors' }),
    ])
      .then(() => {
        checkout.request()
      })
  }, [
    get(checkout, 'data.checkout.id'),
    checkout.request,
    isAddressSame,
  ])

  const setupBillingAddress = useCallback((address) => {
    const billing = {
      selectedBillingAddressId: address.id,
      checkoutId: get(checkout, 'data.checkout.id'),
      billingAddress: {
        ...omit(address, ['id', 'isDefaultBillingAddress', 'isDefaultShippingAddress', 'label']),
        city: get(address, 'city.id', ''),
        country: get(address, 'country.code', ''),
      },
    }

    checkout.request(billing, { query: BILLINGADDRESS, reducer: 'none', parseValue: 'data.checkoutBillingAddressUpdate.checkoutErrors' })
      .then(() => {
        checkout.request()
      })
  }, [
    get(checkout, 'data.checkout.id'),
    checkout.request,
  ])

  const setAddRessEqual = useCallback((value) => {
    setAdressSame(value)
    if(value && shippingAddress) {
      setupBillingAddress(shippingAddress)
    }
  }, [setAdressSame, shippingAddress, setupBillingAddress])

  const complete = useCallback((value) => {
    checkout.request({ checkoutId: get(checkout, 'data.checkout.id') },
      {
        query: COMPLETE,
        reducer: 'none',
        parseValue: 'data.checkoutComplete.order',
        parseErrors: 'data.checkoutComplete.checkoutErrors',
      })
      .then(data => {
        clear({})
        if(get(data, 'lastPayment.redirectPostUrl')) {
          Linking.openURL(data.lastPayment.redirectPostUrl)
        }
        navigation.navigate({
          name: 'ReviewOrder',
          params: {
            token: data.token,
          },
        })
      })
  }, [checkout.request, get(checkout, 'data.checkout.id'), navigation.navigate, clear])


  return (
    <CheckoutView
      isLoading={checkout.initialLoading}
      loading={checkout.isLoading}
      {...checkout.data}
      refetch={refresh}
      refreshing={isRefreshing}
      setupShipping={setupShipping}
      setupPayment={setupPayment}
      applyPromoCode={applyPromoCode}
      errors={checkout.errors}
      isAddressSame={isAddressSame}
      setAdressSame={setAddRessEqual}
      shippingAddress={shippingAddress}
      billingAddress={billingAddress}
      setupShippingAddress={setupShippingAddress}
      setupBillingAddress={setupBillingAddress}
      complete={complete}
      removeDiscount={removeDiscount}
    />
  )
}
