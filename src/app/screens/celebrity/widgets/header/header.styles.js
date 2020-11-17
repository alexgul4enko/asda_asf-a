import { StyleSheet, I18nManager } from 'react-native'
import theme from 'theme'

export default StyleSheet.create({
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'left',
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
    marginTop: 16,
    color: theme.greyText,
  },
  avatar: {
    width: theme.width,
    height: 300,
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: 8,
    transform: [{
      translateX: I18nManager.isRTL ? 12 : -12,
    }],
  },
})
