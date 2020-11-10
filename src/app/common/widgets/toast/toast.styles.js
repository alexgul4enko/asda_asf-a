import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: theme.error,
    backgroundColor: '#E9E9E9',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingLeft: 16,
  },
  button: {
    paddingVertical: 6,
  },
  text: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 12,
  },
})
