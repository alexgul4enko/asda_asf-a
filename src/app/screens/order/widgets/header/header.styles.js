import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  header: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  method: {
    fontWeight: '400',
    color: theme.greyText,
  },
  status: {
    fontWeight: '400',
    textTransform: 'none',
  },
})
