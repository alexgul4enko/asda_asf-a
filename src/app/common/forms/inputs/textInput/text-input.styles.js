import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderBottomColor: 'transparent',
    marginBottom: 10,
  },
  input: {
    fontSize: theme.fontSize,
    flex: 1,
    color: theme.color,
    backgroundColor: 'transparent',
    height: 45,
    padding: 0,
    margin: 0,
  },
  text: {
    color: theme.error,
    fontSize: theme.fontSize,
  },
})
