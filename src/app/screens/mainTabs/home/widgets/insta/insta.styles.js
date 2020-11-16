import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    minHeight: 100,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  title: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    padding: 0,
  },
  image: {
    width: (theme.width - 32) / 3 - 10,
    height: (theme.width - 32) / 3 - 10,
    borderWidth: 0,
    borderRadius: 0,
    margin: 5,
  },
})
