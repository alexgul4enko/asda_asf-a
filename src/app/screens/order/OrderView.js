import PropTypes from 'prop-types'
import { SafeAreaView, SectionList } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import Header from './widgets/header'
import Footer from './widgets/footer'
import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import keyExtractor from './utils/keyExtractor'
import renderSectionHeader from './utils/renderSectionHeader'
import renderItem from './utils/renderItem'
import styles from './order.style'

OrderView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lines: PropTypes.array,
  fulfillments: PropTypes.array,
  status: PropTypes.string,
  statusDisplay: PropTypes.string,
  paymentStatus: PropTypes.string,
  paymentStatusDisplay: PropTypes.string,
  paymentMethod: PropTypes.string,
  subtotal: PropTypes.object,
  shippingPrice: PropTypes.object,
  total: PropTypes.object,
  shippingAddress: PropTypes.object,
  canPayNow: PropTypes.bool,
  lastPayment: PropTypes.string,
  refreshing: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
  cashOnDeliveryFee: PropTypes.object,
  discount: PropTypes.object,
}

OrderView.defaultProps = {
  lines: undefined,
  fulfillments: undefined,
  status: undefined,
  statusDisplay: undefined,
  paymentStatus: undefined,
  paymentStatusDisplay: undefined,
  paymentMethod: undefined,
  subtotal: undefined,
  shippingPrice: undefined,
  total: undefined,
  shippingAddress: undefined,
  canPayNow: undefined,
  lastPayment: undefined,
  cashOnDeliveryFee: undefined,
  discount: undefined,
}

export default function OrderView({
  isLoading,
  lines,
  fulfillments,
  status,
  statusDisplay,
  paymentStatus,
  paymentStatusDisplay,
  paymentMethod,
  subtotal,
  shippingPrice,
  total,
  shippingAddress,
  canPayNow,
  lastPayment,
  refreshing,
  refetch,
  cashOnDeliveryFee,
  discount,
}) {
  const data = useMemo(() => {
    if(!Array.isArray(lines)) { return }
    const infulfilled = lines.filter(({ quantity, quantityFulfilled }) => quantity !== quantityFulfilled)
    return [
      ...fulfillments.map(({ lines, ...rest }) => ({
        ...rest,
        lines: lines.map(({ orderLine, ...rest }) => ({ ...orderLine, ...rest })),
      })),
      {
        id: 'UNFULFILLED',
        lines: infulfilled,
        status: 'UNFULFILLED',
        statusDisplay: gettext('Unfullfiled'),
      },
    ]
      .filter(Boolean)
      .filter(({ lines }) => !isEmpty(lines))
      .map(({ lines, ...item }) => ({ ...item, data: lines }))
  }, [lines, fulfillments])
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <SectionList
          ListHeaderComponent={(
            <Header
              status={status}
              statusDisplay={statusDisplay}
              paymentStatus={paymentStatus}
              paymentStatusDisplay={paymentStatusDisplay}
              paymentMethod={paymentMethod}
            />
          )}
          ListFooterComponent={(
            <Footer
              subtotal={subtotal}
              shippingPrice={shippingPrice}
              total={total}
              shippingAddress={shippingAddress}
              canPayNow={canPayNow}
              lastPayment={lastPayment}
              cashOnDeliveryFee={cashOnDeliveryFee}
              discount={discount}
            />
          )}
          sections={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          refreshing={refreshing}
          onRefresh={refetch}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
