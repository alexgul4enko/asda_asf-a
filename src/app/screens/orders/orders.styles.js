import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  list: {
    paddingVertical: 32,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primaryLight,
    margin: 16,
    padding: 0,
    paddingHorizontal: 16,
  },
  link: {
    fontSize: 13,
    lineHeight: 24,
    color: '#000',
    padding: 8,
  },
})
