import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  button: {
    padding: theme.fontSize,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSizeTitle,
    fontWeight: '500',
    textAlign: 'center',
  },
  outlineButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.primary,
  },
  primaryButton: {
    backgroundColor: theme.primary,
  },
  primaryTitle: {
    color: '#ffffff',
  },
})
