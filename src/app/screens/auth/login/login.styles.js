import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  scroll: {
    paddingTop: 32,
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
  },
  link: {
    marginTop: 8,
  },
  forgot: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
  privacy: {
    color: theme.grey,
    textAlign: 'center',
    marginBottom: 16,
  },
  privacyLink: {
    textDecorationLine: 'underline',
  },
  footer: {
    marginBottom: 16,
    paddingVertical: 10,
  },
  footertext: {
    fontSize: 14,
    fontWeight: '400',
  },
})
