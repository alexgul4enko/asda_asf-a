import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  tab: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  btnMen: {
    padding: 0,
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingLeft: 16,
  },
  btnWomen: {
    padding: 0,
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingRight: 16,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
})
