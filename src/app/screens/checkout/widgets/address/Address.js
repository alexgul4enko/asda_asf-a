import PropTypes from 'prop-types'
import { Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { useMemo } from 'react'
import get from 'lodash/get'
import styles from './address.styles'

Address.propTypes = {
  notitle: PropTypes.node.isRequired,
  id: PropTypes.string,
  country: PropTypes.object,
  countryArea: PropTypes.string,
  city: PropTypes.object,
  postalCode: PropTypes.string,
  streetAddress1: PropTypes.string,
  headerTitle: PropTypes.node.isRequired,
  onChange: PropTypes.func,
}

Address.defaultProps = {
  id: undefined,
  country: undefined,
  countryArea: undefined,
  city: undefined,
  postalCode: undefined,
  streetAddress1: undefined,
  onChange: undefined,
}
export default function Address({
  notitle,
  id,
  country,
  countryArea,
  city,
  postalCode,
  streetAddress1,
  headerTitle,
  onChange,
}) {
  const address = useMemo(() => {
    if(!id) { return notitle }
    return [
      streetAddress1,
      get(city, 'name'),
      postalCode,
      countryArea,
      get(country, 'country'),
    ].filter(Boolean).join(', ')
  }, [
    country,
    id,
    notitle,
    countryArea,
    city,
    postalCode,
    streetAddress1,
  ])
  const params = useMemo(() => ({
    title: headerTitle,
    onChange,
    active: id,
  }), [headerTitle, onChange, id])
  return (
    <Link style={styles.link} to="AddressBook" params={params}>
      <Text style={styles.text}>{address}</Text>
      <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'}/>
    </Link>
  )
}
