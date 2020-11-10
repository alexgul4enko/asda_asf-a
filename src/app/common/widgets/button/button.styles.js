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
    fontSize: 16,
    fontWeight: '600',
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
  animated: {
    padding: theme.fontSize,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    padding: 0,
    backgroundColor: 'transparent',
  },
})
