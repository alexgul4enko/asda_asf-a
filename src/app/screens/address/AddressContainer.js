import NavigationPropTypes from 'common/prop-types/Navigation'
import { Form } from 'react-final-form'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import AddressView from './AddressView'
import validate from './utils/validate'
import { useQuery } from '@cranium/resource'
import { useTranslations } from '@cranium/i18n'
import get from 'lodash/get'
import { parseUpdate, parseCreate, parseDelete } from './utils/parseValue'
import UPDATE from './address.graphql'
import CREATE from './create.graphql'
import MAKEDEFAULT from './makeDefault.graphql'
import ADDRESSES from 'screens/addressBook/address.graphql'
import DELETEADDRESS from './delete.graphql'

AddressContainer.propTypes = NavigationPropTypes

export default function AddressContainer({ navigation, route } = {}) {
  const { gettext } = useTranslations()
  const { request } = useQuery(UPDATE, { reducer: 'none' })
  const handleSubmit = useCallback(({ title, id, isDefaultBillingAddress, isDefaultShippingAddress, ...values } = {}) => {
    const input = {
      ...values,
      city: get(values, 'city.id'),
      country: get(values, 'country.code'),
    }
    return request(id ? { id, input } : { input }, { query: id ? UPDATE : CREATE, parseValue: id ? parseUpdate : parseCreate })
      .then(data => {
        if(get(data, 'address.id')) {
          if(isDefaultShippingAddress) {
            request({ id: get(data, 'address.id') }, { query: MAKEDEFAULT, reducer: 'none', forceUpdates: true })
              .then(() => {
                request({}, { query: ADDRESSES, namespace: 'addressBook', parseValue: 'data.me.addresses', reducer: 'replace' })
              })
          } else {
            request({}, { query: ADDRESSES, namespace: 'addressBook', parseValue: 'data.me.addresses', reducer: 'replace' })
          }
          navigation.goBack()
          return {}
        }
        return data
      })
  }, [request, navigation.goBack])
  const handleDelete = useCallback(() => {
    Alert.alert(
      gettext('Delete address?'),
      null,
      [
        {
          text: gettext('Cancel'),
          style: 'destructive',
        },
        {
          text: gettext('Delete'),
          onPress: () => {
            request({ id: get(route, 'params.id') }, {
              query: DELETEADDRESS,
              parseValue: parseDelete,
            })
              .then(() => {
                request({}, { query: ADDRESSES, namespace: 'addressBook', parseValue: 'data.me.addresses', reducer: 'replace' })
                navigation.goBack()
              })
          },
          style: 'default',
        },
      ]
    )
  }, [gettext, get(route, 'params.id'), request, navigation.goBack])
  return (
    <Form
      onSubmit={handleSubmit}
      render={AddressView}
      validate={validate}
      initialValues={route.params}
      showSwitch={!get(route, 'params.isDefaultShippingAddress')}
      id={get(route, 'params.id')}
      handleDelete={handleDelete}
    />
  )
}
