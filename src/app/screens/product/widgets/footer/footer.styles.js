import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E9E9E9',
    marginTop: 12,
  },
  btn: {
    flex: 1,
    marginLeft: 16,
  },
  button: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  overlay: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  bagFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 16,
    marginRight: 8,
  },
  totalPrice: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginLeft: 8,
  },
  link: {
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
})
