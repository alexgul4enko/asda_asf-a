import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 4,
    padding: 0,
  },
  avatar: {
    height: 180,
    width: theme.width / 2 - 24,
    borderWidth: 0,
    borderRadius: 0,
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 8,
    paddingBottom: 10,
    width: theme.width / 2 - 24,
  },
})
