import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  scroll: {
    paddingTop: 32,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
  success: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    lineHeight: 24,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
})
