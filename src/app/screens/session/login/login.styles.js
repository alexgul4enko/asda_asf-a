import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  main: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: theme.padding,
  },
  loginButton: {
    alignSelf: 'stretch',
  },
})
