import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.borderColor,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    borderRadius: 0,
    marginRight: 12,
  },
  text: {
    fontSize: 14,
  },
})
