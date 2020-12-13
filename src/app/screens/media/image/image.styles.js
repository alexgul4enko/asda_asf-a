import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  btn: {
    padding: 0,
  },
  imageWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: theme.width - 30,
    height: undefined,
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    marginBottom: 16,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    padding: 0,
    paddingVertical: 16,
    fontSize: 18,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'left',
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    color: '#000000',
    fontWeight: 'bold',
    paddingBottom: 24,
  },
})
