import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: theme.borderColor,
    marginVertical: 8,
    padding: 0,
    flexDirection: 'column',
  },
  selected: {
    backgroundColor: theme.primaryLight,
  },
  default: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.borderColor,
    alignSelf: 'stretch',
    height: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    padding: 16,
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    lineHeight: 20,
  },
  editWrapper: {
    alignSelf: 'stretch',
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  editText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    marginRight: 4,
  },
})
