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
    flex: 1,
    alignSelf: 'stretch',
    height: 180,
    width: theme.width / 2 - 24,
    borderWidth: 0,
    borderRadius: 0,
  },
  title: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 8,
    paddingBottom: 10,
    width: theme.width / 2 - 24,
  },
})
