import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  item: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.grey,
    marginHorizontal: 8,
    marginVertical: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 20,
  },
})
