import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.grey,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
  },
})
