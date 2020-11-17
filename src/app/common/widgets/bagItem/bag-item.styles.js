import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
  },
  image: {
    width: 96,
    height: 96,
    borderWidth: 0,
    borderRadius: 0,
    marginRight: 8,
  },
  attributes: {
    flex: 1,
    alignSelf: 'stretch',
  },
  attribute: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontWeight: '600',
    lineHeight: 24,
    fontSize: 12,
  },
  value: {
    lineHeight: 16,
    fontSize: 12,
    color: theme.greyText,
    marginLeft: 8,
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
  deleteButton: {
    paddingTop: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  link: {
    padding: 0,
  },
})
