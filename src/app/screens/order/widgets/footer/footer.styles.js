import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  footer: {
    paddingBottom: 32,
    backgroundColor: '#ffffff',
  },
  totalContainer: {
    backgroundColor: '#FBFBFB',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 8,
    textAlign: 'left',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
  },
  totalValue: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    textAlign: 'right',
  },
  bold: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
  },
  address: {
    paddingHorizontal: 16,
  },
  btnWrapper: {
    paddingHorizontal: 16,
  },
  pay: {
    paddingVertical: 12,
  },
  shippingTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    marginTop: 8,
    textAlign: 'left',
  },
})
