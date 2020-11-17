import PropTypes from 'prop-types'
import { LoadingWrapper } from 'common/widgets/loading'
import { TranslateProvider } from '@cranium/i18n'
import { useMemo, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import * as RNLocalize from 'react-native-localize'
import get from 'lodash/get'
import { API } from '@cranium/api'
import api from 'api'

const langAPI = new API({
  baseURL: 'https://api.wecre8.inprogress.rocks/',
})


const lang = get(RNLocalize.findBestAvailableLanguage(['en', 'ar']), 'languageTag', 'en')

Translations.propTypes = {
  children: PropTypes.node,
}

Translations.defaultProps = {
  children: null,
}

export default function Translations({ children }) {
  const [loading, setLoading] = useState(true)
  const request = useMemo(() => ({
    get: function(url, params) {
      api.interceptors.request.use({
        onSuccess: (consfigs) => {
          const headers = new Headers(consfigs.headers)
          headers.set('accept-language', params.params.lang)

          if(consfigs.method === 'POST' && typeof consfigs.body === 'string' && consfigs.body.includes('languageCode')) {
            const { query, variables } = JSON.parse(consfigs.body)
            return {
              ...consfigs,
              headers,
              body: JSON.stringify({
                query,
                variables: { ...(variables || {}), languageCode: params.params.lang.toUpperCase() },
              }),
            }
          }
          return {
            ...consfigs,
            headers,
          }
        },
      })
      setLoading(false)
      return langAPI.get(url, params)
        .then(data => get(data, 'catalog', {}))
    },
  }), [setLoading])
  return (
    <TranslateProvider
      langKey="wecre8Lang"
      defaultLanguage={lang}
      storage={AsyncStorage}
      url="static-translations/:lang"
      api={request}
      monoLanguageJSON
    >
      <LoadingWrapper isLoading={loading}>
        {children}
      </LoadingWrapper>
    </TranslateProvider>
  )
}
