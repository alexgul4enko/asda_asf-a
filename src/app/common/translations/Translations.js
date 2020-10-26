import PropTypes from 'prop-types'
import { TranslateProvider } from '@cranium/i18n'
import AsyncStorage from '@react-native-community/async-storage'
import { API } from '@cranium/api'

// TODO: add tranlates url to env
const api = new API({
  baseURL: 'https://wecre8.inprogress.rocks',
})

Translations.propTypes = {
  children: PropTypes.node,
}

export default function Translations({ children }) {
  return (
    <TranslateProvider
      defaultLanguage="en"
      storage={AsyncStorage}
      url="jsi18n"
      api={api}
    >
      {children}
    </TranslateProvider>
  )
}
