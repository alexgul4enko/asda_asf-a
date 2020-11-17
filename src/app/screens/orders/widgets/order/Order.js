import PropTypes from 'prop-types'
import { Text, View, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Avatar from 'common/widgets/avatar'
import { useMemo } from 'react'
import moment from 'moment'
import get from 'lodash/get'
import getStatusColor from 'common/utils/getStatusColor'
import styles from './order.styles'


Order.propTypes = {
  status: PropTypes.string,
  statusDisplay: PropTypes.string,
  number: PropTypes.number,
  created: PropTypes.string,
  total: PropTypes.object,
  lines: PropTypes.array,
  token: PropTypes.string,
}

Order.defaultProps = {
  status: undefined,
  statusDisplay: undefined,
  number: undefined,
  created: undefined,
  total: undefined,
  lines: undefined,
  token: undefined,
}

export default function Order({ status, statusDisplay, number, created, total, lines, token }) {
  const color = useMemo(() => getStatusColor(status), [status])
  const statusStyle = useMemo(() => ([styles.status, { color }]), [color])
  const leftLine = useMemo(() => ([styles.leftLine, { backgroundColor: color }]), [color])
  const totalPrice = useMemo(() => {
    const currency = get(total, 'currency')
    const amount = (get(total, 'gross.amount') || '').toLocaleString()
    const totalPriceText = [currency, amount].filter(Boolean)
    return I18nManager.isRTL ? totalPriceText.reverse().join(' ') : totalPriceText.join(' ')
  }, [total])
  const images = useMemo(() => {
    if(!Array.isArray(lines)) { return null }
    return lines.slice(0, 4).map(({ id, thumbnail }) => (
      <Avatar
        key={id}
        style={styles.image}
        url={get(thumbnail, 'url')}
        noImage="noimage"
      />
    ))
  }, [lines])
  const params = useMemo(() => ({ token, number }), [token, number])
  return (
    <Link to="Order" style={styles.btn} params={params}>
      <View style={leftLine}/>
      <View style={styles.header}>
        <Text style={styles.number}>{I18nManager.isRTL ? `${number}#` : `#${number}`}</Text>
        <Text style={styles.date}>{moment(created).format('DD/MM/YY')}</Text>
      </View>
      <Text style={statusStyle}>{statusDisplay}</Text>
      <View style={styles.lines}>
        {images}
      </View>
      <Text style={styles.price}>{totalPrice}</Text>
    </Link>
  )
}
