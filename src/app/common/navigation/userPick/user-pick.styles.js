import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  favourites: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 0,
    paddingRight: 8,
  },
  cart: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 0,
    paddingLeft: 8,
  },
})
