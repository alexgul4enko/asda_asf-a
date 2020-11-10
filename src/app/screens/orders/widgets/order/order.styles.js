import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  btn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: theme.borderColor,
    marginBottom: 12,
    marginHorizontal: 9,
  },
  number: {
    fontSize: 12,
    lineHeight: 24,
    color: theme.greyText,
  },
  date: {
    color: theme.grey,
    fontSize: 12,
    lineHeight: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  status: {
    fontSize: 12,
    lineHeight: 24,
  },
  leftLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    opacity: 0.6,
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  lines: {
    flexDirection: 'row',
  },
  image: {
    width: 48,
    height: 48,
    borderWidth: 0,
    borderRadius: 0,
    marginLeft: 4,
    marginTop: 12,
    marginBottom: 8,
  },
})
