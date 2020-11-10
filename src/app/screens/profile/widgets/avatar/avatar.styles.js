import { StyleSheet } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  root: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',

  },
  instructions: {
    fontSize: 10,
    lineHeight: 16,
    marginLeft: 12,
  },
  fade: {
    overflow: 'hidden',
    flex: 0,
    alignSelf: 'flex-start',
  },
  uploading: {
    position: 'absolute',
    borderRadius: 60,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    padding: 0,
  },
  img: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.grey,
    overflow: 'hidden',
  },
})
