import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    width: theme.width,
    height: 400,
  },
  pages: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 2,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  page: {
    color: '#ffffff',
    fontSize: 11,
    lineHeight: 16,
  },
})
