import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 24,
    textAlign: 'left',
  },
  payments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areSame: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    marginVertical: 16,
  },
  sameText: {
    paddingHorizontal: 16,
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
  },
})
