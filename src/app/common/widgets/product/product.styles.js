import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  link: {
    width: theme.width / 2 - 20,
    flexDirection: 'column',
    padding: 0,
    marginHorizontal: 4,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  img: {
    width: theme.width / 2 - 28,
    height: theme.width / 2 - 28,
    borderWidth: 0,
    borderRadius: 0,
  },
  vip: {
    position: 'absolute',
    top: 0,
    right: 8,
    backgroundColor: '#7048e8',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    color: '#ffffff',
  },
  name: {
    fontSize: 14,
    lineHeight: 16,
    marginTop: 8,
    height: 32,
    textAlign: 'left',
  },
  sale: {
    color: theme.grey,
    fontSize: 14,
    lineHeight: 16,
    textDecorationLine: 'line-through',
  },
  price: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    flex: 1,
    padding: 0,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  like: {
    paddingVertical: 4,
    paddingRight: 8,
    alignSelf: 'stretch',
  },
  liked: {
    position: 'absolute',
    // left: 16,
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  deleteButton: {
    padding: 8,
    marginRight: 8,
  },
})
