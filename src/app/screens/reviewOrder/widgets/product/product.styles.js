import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  product: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: theme.borderColor,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
  },
  data: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  image: {
    width: 96,
    height: 96,
    borderWidth: 0,
    borderRadius: 0,
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 8,
  },
  name: {
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
    marginBottom: 8,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  variant: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    marginBottom: 4,
  },
  value: {
    fontWeight: '400',
    color: theme.greyText,
  },
  totalPrice: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
    marginLeft: 96 + 8,
  },
})
