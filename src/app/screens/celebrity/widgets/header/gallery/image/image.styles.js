import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#DDDDDD',
    marginRight: 10,
    width: 152,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 152,
    height: 86,
    borderWidth: 0,
    borderRadius: 0,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    padding: 8,
    fontSize: 11,
    lineHeight: 16,
    color: '#000000',
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'left',
  },
})
