import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderBottomColor: theme.borderColor,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'space-between',
    paddingVertical: 0,
  },
  active: {
    backgroundColor: theme.primaryLight,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
})
