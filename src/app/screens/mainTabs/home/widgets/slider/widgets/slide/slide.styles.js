import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  slide: {
    width: theme.width,
    height: 240,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
  },
  banner: {
    position: 'absolute',
    left: 32,
    top: 32,
    backgroundColor: '#ffffff',
    padding: 16,
    width: theme.width / 2,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    lineHeight: 15,
    marginBottom: 12,
  },
  link: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: 12,
  },
})
