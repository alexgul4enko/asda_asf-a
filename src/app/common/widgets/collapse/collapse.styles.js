import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.borderColor,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingVertical: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
  },
})
