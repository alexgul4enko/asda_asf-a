import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  promo: {
    backgroundColor: '#FBFBFB',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E9E9E9',
    padding: 16,
    marginVertical: 16,
  },
  promoText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginVertical: 8,
  },
  btn: {
    paddingVertical: 10,
  },
  btnTextStyle: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
  },
  inputWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#DDDDDD',
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  input: {
    fontSize: 12,
    flex: 1,
    color: '#000000',
    backgroundColor: 'transparent',
    height: 36,
    paddingHorizontal: 16,
  },
})
