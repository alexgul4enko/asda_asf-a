import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  outOfStock: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: theme.greyText,
    textTransform: 'uppercase',
    marginTop: 16,
  },
  variant: {
    marginTop: 16,
  },
  variantTitle: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
  },
  variantTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    marginRight: 8,
    marginVertical: 8,
    borderWidth: 2,
  },
  button: {
    padding: 8,
  },
  image: {
    width: 24,
    height: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.borderColor,
  },
  variantName: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  quantity: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
  },
})
