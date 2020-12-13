import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  product: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: theme.borderColor,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
  },
  data: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  image: {
    width: 96,
    height: 96,
    borderWidth: 0,
    borderRadius: 0,
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 8,
  },
  title: {
    fontSize: 11,
    lineHeight: 24,
  },
  name: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    marginBottom: 8,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  variant: {
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 16,
    color: '#000000',
  },
  value: {
    fontWeight: '400',
    color: theme.greyText,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerInfo: {
    fontWeight: '600',
    fontSize: 8,
    lineHeight: 16,
    color: theme.grey,
    textAlign: 'left',
  },
  footerValue: {
    fontSize: 13,
    lineHeight: 24,
    color: '#000000',
  },
  center: {
    textAlign: 'center',
  },
  end: {
    textAlign: 'right',
  },
  bold: {
    fontWeight: '700',
  },
  link: {
    padding: 0,
  },
})
