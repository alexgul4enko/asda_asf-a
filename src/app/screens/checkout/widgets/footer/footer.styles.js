import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  footer: {
    alignSelf: 'stretch',
    backgroundColor: '#FBFBFB',
    padding: 16,
  },
  title: {
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceAttr: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
  },
  priceTotal: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
  },
  privacy: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: '#000000',
    marginTop: 12,
    marginBottom: 24,
    textAlign: 'left',
  },
  privacyLink: {
    textDecorationLine: 'underline',
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 12,
    marginTop: 8,
  },
  complete: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    color: '#ffffff',
    marginRight: 2,
  },
  discount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountButton: {
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
})
