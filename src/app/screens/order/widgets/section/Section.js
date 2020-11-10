import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Info from './Info'
import { useMemo } from 'react'
import get from 'lodash/get'
import styles from './section.styles'

Section.propTypes = {
  shipping: PropTypes.object,
  status: PropTypes.string,
  statusDisplay: PropTypes.string,
  trackingNumber: PropTypes.string,
}

Section.defaultProps = {
  shipping: undefined,
  status: undefined,
  statusDisplay: undefined,
  trackingNumber: undefined,
}

export default function Section({ shipping, status, statusDisplay, trackingNumber }) {
  const title = useMemo(() => {
    return [styles.title, status === 'UNFULFILLED' && styles.unfulfilled]
  }, [status])
  return (
    <View style={styles.header}>
      <Text style={title}>{statusDisplay}</Text>
      <Info
        title={gettext('Status')}
        value={get(shipping, 'deliveryStatus')}
      />
      <Info
        title={gettext('Location')}
        value={get(shipping, 'deliveryCurrentLocation')}
      />
      <Info
        title={gettext('Tracking number')}
        value={get(shipping, 'trackingCode', trackingNumber)}
      />
    </View>
  )
}
