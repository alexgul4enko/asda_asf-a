import PropTypes from 'prop-types'
import { Text, View, I18nManager } from 'react-native'
import Button from 'common/widgets/button'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { useCallback, useMemo } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import get from 'lodash/get'
import styles from './address.styles'

Address.propTypes = {
  label: PropTypes.string,
  streetAddress1: PropTypes.string,
  streetAddress2: PropTypes.string,
  city: PropTypes.object,
  postalCode: PropTypes.string,
  country: PropTypes.object,
  phone: PropTypes.string,
  isDefaultShippingAddress: PropTypes.bool,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  children: PropTypes.node,
}

Address.defaultProps = {
  label: undefined,
  streetAddress1: undefined,
  streetAddress2: undefined,
  city: undefined,
  postalCode: undefined,
  country: undefined,
  phone: undefined,
  isDefaultShippingAddress: undefined,
  id: undefined,
  readOnly: undefined,
  children: undefined,
}

export default function Address(props) {
  const {
    label,
    streetAddress1,
    streetAddress2,
    city,
    postalCode,
    country,
    phone,
    isDefaultShippingAddress,
    id,
    readOnly,
    children,
  } = props
  const route = useRoute()
  const navigation = useNavigation()
  const handlePress = useCallback(() => {
    if(!get(route, 'params.onChange')) {
      return
    }
    route.params.onChange(props)
    navigation.goBack()
  }, [get(route, 'params.onChange'), props, navigation.goBack])
  const cardStyle = useMemo(() => ([
    styles.card,
    get(route, 'params.active') === id && styles.selected,
  ]), [get(route, 'params.active'), id])
  return (

    <Button disabled={!get(route, 'params.onChange')} onPress={handlePress} style={cardStyle}>
      {children}
      {
        (isDefaultShippingAddress && !readOnly) ? (
          <View style={styles.default}>
            <Text style={styles.defaultText}>{gettext('Default')}</Text>
          </View>
        ) : null
      }
      <View style={styles.content}>
        {label ? (<Text style={styles.label}>{label}</Text>) : null}
        {streetAddress1 ? (<Text style={styles.text}>{streetAddress1}</Text>) : null}
        {streetAddress2 ? (<Text style={styles.text}>{streetAddress2}</Text>) : null}
        <Text style={styles.text}>{get(city, 'name')} {postalCode}</Text>
        {get(country, 'country') ? (<Text style={styles.text}>{get(country, 'country')}</Text>) : null}
        {phone ? (<Text style={styles.text}>{I18nManager.isRTL ? [gettext('Phone number'), ' :', phone].reverse() : [gettext('Phone number'), ': ', phone]}</Text>) : null}
      </View>
      {
        readOnly ? null : (
          <View style={styles.editWrapper}>
            <Link to="Address" params={props} style={styles.edit}>
              <Text style={styles.editText}>{gettext('Edit')}</Text>
              <Icon name="edit-01" size={16}/>
            </Link>
          </View>
        )
      }
    </Button>
  )
}
