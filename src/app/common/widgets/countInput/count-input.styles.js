import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  countRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.borderColor,
  },
  countIncrement: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  input: {
    height: 32,
    width: 56,
    paddingVertical: 0,
    paddingHorizontal: 8,
    textAlign: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: theme.borderColor,
  },
})
