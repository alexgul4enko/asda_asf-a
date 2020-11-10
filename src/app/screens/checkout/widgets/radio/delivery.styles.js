import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    alignSelf: 'stretch',
  },
  rootCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.primary,
  },
  title: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 10,
  },
  buttonWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
})
