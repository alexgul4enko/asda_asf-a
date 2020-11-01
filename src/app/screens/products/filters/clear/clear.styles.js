import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  clear: {
    paddingVertical: 5,
    marginRight: 16,
    paddingHorizontal: 12,
  },
  clearText: {
    color: theme.primary,
    textTransform: 'capitalize',
    fontSize: 12,
    lineHeight: 16,
  },
})
