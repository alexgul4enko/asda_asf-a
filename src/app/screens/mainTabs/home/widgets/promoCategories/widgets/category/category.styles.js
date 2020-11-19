import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  btn: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginHorizontal: 6,
    width: 120,
  },
  image: {
    width: 100,
    height: 128,
    borderRadius: 0,
    borderWidth: 0,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    marginTop: 6,
    height: 36,
  },
  price: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 14,
    marginTop: 6,
    color: theme.primaryColor,
  },
  link: {
    fontSize: 10,
    lineHeight: 14,
    color: '#000000',
    textAlign: 'center',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
})
