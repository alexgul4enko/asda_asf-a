import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  scroll: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: -6,
    },
    shadowOpacity: 0.1,
    elevation: 6,
  },
})
