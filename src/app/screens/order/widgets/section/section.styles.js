import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  header: {
    padding: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 24,
    color: '#37B24D',
    marginBottom: 4,
  },
  unfulfilled: {
    color: '#F54046',
  },
  info: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    marginBottom: 4,
  },
  value: {
    color: theme.greyText,
  },
})
