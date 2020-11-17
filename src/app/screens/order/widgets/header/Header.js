import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { useMemo } from 'react'
import getStatusColor from 'common/utils/getStatusColor'
import styles from './header.styles'


function getPaymentColor(status) {
  switch (status) {
    case 'NOT_CHARGED':
      return '#F54046'
    case 'FULLY_CHARGED':
      return '#37B24D'
    case 'PARTIALLY_CHARGED':
    case 'PARTIALLY_REFUNDED':
    case 'FULLY_REFUNDED':
    default:
      return '#000000'
  }
}

Header.propTypes = {
  status: PropTypes.string,
  statusDisplay: PropTypes.string,
  paymentStatus: PropTypes.string,
  paymentStatusDisplay: PropTypes.string,
  paymentMethod: PropTypes.string,
}

Header.defaultProps = {
  status: undefined,
  statusDisplay: undefined,
  paymentStatus: undefined,
  paymentStatusDisplay: undefined,
  paymentMethod: undefined,
}


export default function Header({
  status,
  statusDisplay,
  paymentStatus,
  paymentStatusDisplay,
  paymentMethod,
}) {
  const statusStyles = useMemo(() => [styles.title, styles.status, { color: getStatusColor(status) }], [status])
  const paymentStyles = useMemo(() => [styles.title, styles.status, { color: getPaymentColor(paymentStatus) }], [paymentStatus])
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Text style={styles.title}>{gettext('Your order')}</Text>
        <Text style={styles.title}>:</Text>
        <Text style={styles.title}> </Text>
        <Text style={statusStyles}>{statusDisplay}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{gettext('Payment')}</Text>
        <Text style={styles.title}>:</Text>
        <Text style={styles.title}> </Text>
        <Text style={paymentStyles}>{paymentStatusDisplay}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{gettext('PAYMENT METHOD')}</Text>
        <Text style={styles.title}>:</Text>
        <Text style={styles.title}> </Text>
        <Text style={[styles.title, styles.method]}>{paymentMethod}</Text>
      </View>
    </View>
  )
}
