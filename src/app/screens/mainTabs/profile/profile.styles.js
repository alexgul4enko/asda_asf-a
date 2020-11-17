import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  main: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  scroll: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 24,
    textAlign: 'left',
  },
  link: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.borderColor,
    paddingHorizontal: 0,
  },
  contacts: {
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  address: {
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.borderColor,
    borderBottomColor: theme.borderColor,
    marginBottom: 16,
  },
  buttonWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: theme.borderColor,
  },
  contactButton: {
    alignSelf: 'stretch',
  },
  contactText: {
    marginTop: 10,

  },
  logout: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 24,
    paddingVertical: 10,
  },
  logoutext: {
    color: theme.primary,
    fontWeight: '400',
  },
})
