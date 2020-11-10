import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  vip: {
    backgroundColor: '#7048E8',
    color: '#ffffff',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 12,
    paddingVertical: 3,
    paddingHorizontal: 6,
    position: 'absolute',
    top: 6,
    right: 6,
  },
  content: {
    alignSelf: 'stretch',
    paddingHorizontal: 16,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 16,
  },
  sku: {
    color: theme.grey,
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 10,
    marginTop: 6,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  sale: {
    fontSize: 14,
    lineHeight: 16,
    color: theme.grey,
  },
  discount: {
    backgroundColor: '#FEF5F6',
    color: '#F54046',
    fontSize: 12,
    lineHeight: 14,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginLeft: 10,
  },
  delivery: {
    backgroundColor: '#FBFBFB',
    borderColor: '#E9E9E9',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 16,
  },
  deliveryText: {
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 12,
  },
  Riyadh: {
    fontWeight: '600',
  },

})
