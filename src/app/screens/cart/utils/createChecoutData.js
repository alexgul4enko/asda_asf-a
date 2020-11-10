import get from 'lodash/get'
import omit from 'lodash/omit'

export default function createChecoutData(bag, me) {
  const lines = bag.map(({ quantity, variant }) => ({ quantity, variantId: variant.id }))
  const defaultAddress = (get(me, 'addresses') || []).find(({ isDefaultShippingAddress }) => isDefaultShippingAddress)
  if(!defaultAddress) {
    return {
      lines,
      email: get(me, 'email'),
    }
  }
  const addr = {
    ...omit(defaultAddress, ['id', 'isDefaultBillingAddress', 'isDefaultShippingAddress', 'label']),
    city: get(defaultAddress, 'city.id', ''),
    country: get(defaultAddress, 'country.code', ''),
  }
  return {
    lines,
    email: get(me, 'email'),
    billingAddress: addr,
    shippingAddress: addr,
    selectedBillingAddressId: defaultAddress.id,
    selectedShippingAddressId: defaultAddress.id,
  }
}
