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
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
  },
  delete: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
  deleteText: {
    color: theme.primary,
    fontSize: 14,
  },
})
