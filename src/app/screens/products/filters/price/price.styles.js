import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignSelf: 'stretch',
  },
  form: {
    alignSelf: 'stretch',
  },
  inputsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 24,

  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'capitalize',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 16,
    height: 36,
    minHeight: 36,
    padding: 0,
    paddingHorizontal: 8,
  },
  error: {
    marginHorizontal: 16,
    marginVertical: 12,
    color: theme.error,
  },
  clear: {
    paddingVertical: 5,
    marginRight: 16,
    paddingHorizontal: 12,
  },
  clearText: {
    color: theme.primary,
    textTransform: 'capitalize',
    fontSize: 12,
    lineHeight: 16,
  },
})
