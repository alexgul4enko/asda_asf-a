import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    height: 42,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: theme.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 8,
  },
  close: {
    alignSelf: 'stretch',
    padding: 0,
    width: 42,
    height: 42,
  },
})
