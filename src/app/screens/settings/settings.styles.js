import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  form: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 16,
  },
  desc: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  subscribeTitle: {
    marginBottom: 16,
    marginTop: 32,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
  },
  title: {
    marginVertical: 16,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
  },
  subscribeForm: {
    paddingTop: 24,
  },
  privacy: {
    color: theme.grey,
    textAlign: 'center',
    marginTop: 16,
  },
  privacyLink: {
    textDecorationLine: 'underline',
  },
  subscribe: {
    marginBottom: 16,
  },
})
