import { StyleSheet, I18nManager } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    paddingHorizontal: 12,
  },
  input: {
    fontSize: theme.fontSize,
    flex: 1,
    color: theme.color,
    backgroundColor: 'transparent',
    height: 42,
    padding: 0,
    margin: 0,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  text: {
    color: theme.error,
    fontSize: theme.fontSize,
  },
  passwordButton: {
    paddingRight: 0,
    paddingVertical: 5,
  },
  disabled: {
    backgroundColor: '#F6F6F6',
  },
})
