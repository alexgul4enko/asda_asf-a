import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignSelf: 'stretch',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
    color: '#ffffff',
    marginBottom: 2,
  },
  desc: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16,
    color: '#ffffff',
  },
  underline: {
    alignSelf: 'stretch',
    width: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    padding: 0,
  },
  link: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16,
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
})
