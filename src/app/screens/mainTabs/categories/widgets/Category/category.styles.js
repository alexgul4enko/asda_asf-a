import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderBottomColor: theme.borderColor,
    height: 72,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 0,
  },
  title: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 24,
    paddingHorizontal: 16,
    flex: 1,
  },
  all: {
  },
  rootLink: {
    fontWeight: '600',
    fontSize: 14,
  },
})
