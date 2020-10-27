import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  tab: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  btn: {
    padding: 0,
    alignSelf: 'stretch',
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
})
