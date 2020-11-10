import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  odd: {
    backgroundColor: '#F6F6F6',
  },
  col: {
    width: theme.width / 2 - 16,
    paddingHorizontal: 8,
    paddingVertical: 8,

  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.greyText,
  },
})
