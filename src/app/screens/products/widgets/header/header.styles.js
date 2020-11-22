import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  sort: {
    borderRightWidth: 0,
  },
  btn: {
    flex: 1,
    alignSelf: 'flex-start',
    width: theme.width / 2 - 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.primary,
    paddingVertical: 10,
    height: 38,
  },
  title: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 4,
  },
})
