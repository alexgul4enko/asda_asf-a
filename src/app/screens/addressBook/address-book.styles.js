import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  list: {
    paddingHorizontal: 12,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: -6,
    },
    shadowOpacity: 0.1,
    elevation: 6,
  },
  linkText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
})
