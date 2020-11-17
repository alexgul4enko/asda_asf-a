import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  primary: {
    backgroundColor: theme.primaryLight,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'left',
  },
  rect: {
    height: 90,
    width: theme.width / 2,
    backgroundColor: theme.primaryLight,
    position: 'absolute',
    bottom: 10,
    left: 0,
  },
})
