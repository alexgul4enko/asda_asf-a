import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  page: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  image: {
    height: 54,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 44,
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
