import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.borderColor,
    paddingVertical: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
  },
  selection: {
    flex: 1,
    marginRight: 36,
    color: theme.grey,
    marginLeft: 12,
  },
})
