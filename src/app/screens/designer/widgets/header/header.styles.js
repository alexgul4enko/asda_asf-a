import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 96,
    height: 36,
  },
  brand: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  designer: {
    flexDirection: 'row',
  },
  photoWrapper: {
    width: 96,
    height: 128,
    padding: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.1,
    marginRight: 4,
    marginBottom: 4,
    elevation: 6,
    position: 'absolute',
    bottom: 0,
  },
  photo: {
    flex: 1,
    alignSelf: 'stretch',
    width: 92,
    borderWidth: 0,
    borderRadius: 0,
    height: undefined,
  },
  mediaButton: {
    paddingVertical: 12,
    paddingBottom: 0,
  },
  desc: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 12,
    color: theme.greyText,
  },
  avatar: {
    width: theme.width,
    height: 300,
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: 8,
    transform: [{
      translateX: -12,
    }],
  },
})
