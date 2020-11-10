import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    width: theme.width,
    height: 400,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    marginBottom: 2,
    elevation: 2,
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
