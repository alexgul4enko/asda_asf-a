import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import AppNavigator from './AppNavigator'
import CacheProvider from 'common/cache'
import { ApolloProvider } from '@apollo/client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TranslateProvider } from '@ds-frontend/i18n'
import { API } from '@ds-frontend/api'
import { client } from './init'

// TODO: add tranlates url to env
const api = new API({
  baseURL: 'https://wecre8.inprogress.rocks',
})

export default function App() {
  return (
    <TranslateProvider
      defaultLanguage="en"
      storage={AsyncStorage}
      url="jsi18n"
      api={api}
    >
      <SafeAreaProvider>
        <CacheProvider>
          <ApolloProvider client={client}>
            <AppNavigator/>
          </ApolloProvider>
        </CacheProvider>
      </SafeAreaProvider>
    </TranslateProvider>
  )
}
