import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
  },
  static: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 32,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  desc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 32,
  },
  image: {
    marginBottom: 32,
    height: 80,
    width: 80,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
  },
  recomendations: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
})
