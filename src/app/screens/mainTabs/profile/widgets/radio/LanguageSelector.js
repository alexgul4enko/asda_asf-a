import Radio from './Radio'
import AsyncStorage from '@react-native-community/async-storage'
import { View, I18nManager } from 'react-native'
import RNRestart from 'react-native-restart'
import { useCallback } from 'react'
import { useTranslations } from '@cranium/i18n'
import styles from './lang.styles'


export default function LanguageSelector() {
  const { language } = useTranslations()
  const handleChange = useCallback((lang) => {
    if(lang === language) { return }
    AsyncStorage.setItem('wecre8Lang', lang)
      .then(() => {
        I18nManager.forceRTL(lang === 'ar')
        RNRestart.Restart()
      })
  }, [language])
  return (
    <View style={styles.root}>
      <Radio
        value="en"
        isActive={language === 'en'}
        onChange={handleChange}
        title={gettext('English')}
      />
      <Radio
        value="ar"
        isActive={language === 'ar'}
        onChange={handleChange}
        title={gettext('Arabic')}
      />
    </View>
  )
}
