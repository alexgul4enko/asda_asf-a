import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: 4,
    aspectRatio: 0.725,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 0,
  },
  title: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: theme.primary,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    aspectRatio: 0.725,
  },
})
